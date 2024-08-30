const cds = require('@sap/cds');
const utilitySBPA = require("./utils/utilitySBPA");
const { uuid } = cds.utils;

module.exports = async function () {

  const db = await cds.connect.to('db'); // connect to database service
  const { Materials, MaterialRequisitions ,Orders,OrderItems, Z_SUBC_PLANT_C,MRApprovals,Plants,Projects,WBSElements, SubContractorDetails} = cds.entities; // get reflected definitions


  this.on("READ", "SubContractorDetails", async (req) => {
    var {email} = cds.context.user.id;
    if(!email){
      email = "ajit.kumar.panda@sap.com"
    }
    const subcontractor = await SELECT.one.from(SubContractorDetails).where({ emailId: email });
    
    if (subcontractor) {
      subcontractor.date = new Date().toISOString().split('T')[0]; // current date in YYYY-MM-DD format
    }
    
    console.log("subcontractor", subcontractor);
    return subcontractor;
  });
  

  

  this.on('READ', 'Plants', async (req) => {
    const apiS4Srv = await cds.connect.to("Z_SUBC_PLANT_C_CDS");
    let response = await apiS4Srv.send({ method: 'GET', path: 'Z_SUBC_PLANT_C' });
  
    // Transform the response to map werks -> code and name1 -> name
    const transformedData = response.map(item => ({
      code: item.werks,
      name: item.name1
    }));
  
    //console.log('transformedData',transformedData);
  
    return transformedData;
  });

  
  this.on('READ', 'Projects', async (req) => {
    const apiS4Srv = await cds.connect.to("Z_SUBC_PROJ_C_CDS");
    let response = await apiS4Srv.send({ method: 'GET', path: 'Z_SUBC_PROJ_C' });
    //console.log(response);

    const transformedData = response.map(item => ({
      code: item.pspid,
      description: item.post1
    }));
  
    //console.log('transformedData',transformedData);
    return transformedData;
  

    //return { message: 'Data fetched and stored successfully' };
  });

  this.on('READ', 'WBSElements', async (req) => {
    const apiS4Srv = await cds.connect.to("Z_SUBC_WBS_C_CDS");
    let response = await apiS4Srv.send({ method: 'GET', path: 'Z_SUBC_wbs_C' });
    //console.log(response);

    const transformedData = response.map(item => ({
      number: item.posid,
      description: item.post1_wbs,
      project_code:item.pspid

    }));
  
    //console.log('transformedData',transformedData);
  
    return transformedData;
  
  });

  this.on("setplantAndProjectDetails", async (req) => {
    const { projectCode, plant } = req.data;

    // Get the email of the currently logged-in user
    var {email} = cds.context.user.id;
    if(!email){
      email = "ajit.kumar.panda@sap.com"
    }

    // Update the SubContractorDetails entity with the provided plant and project values
    await UPDATE(SubContractorDetails)
        .set({
            plant_code: plant,
            project_code: projectCode,
        })
        .where({ emailId: email });

        console.log("Update Success")


});


  this.on("requestMaterial", async (req) => {
    const { materialCode, quantity, wbsNo, projectCode, plant } = req.data;
    
    // Check if material exists
    const material = await SELECT.one.from(Materials).where({ code: materialCode });
    if (!material) {
      return req.error(404, `Material with code ${materialCode} not found`);
    }

    // Fetch uom and materialName from the Materials entity
    const uom = material.uom_name;
    const materialName = material.name;
    const quantityAvlToBIssued = material.quantityAvlToBIssued;
    const requestedQuantity = Number(quantity);
    const availableQuantity = Number(quantityAvlToBIssued);
    const materialGroup =material.materialGroup_id;
    console.log("material.materialGroup_id",material.materialGroup_id);

    if (requestedQuantity > availableQuantity) {
      return req.error(400, 'Insufficient goods available');
    }

    // Create a new material requisition entry
    const materialRequisition = {
      ID: cds.utils.uuid(), // generate a unique ID
      materialCode:req.data.materialCode,
      quantity:quantity,
      uom_name: uom,
      materialName:materialName,
      wbsNo_number: wbsNo, // assuming this is the correct foreign key field name
      projectCode_code: projectCode, // assuming this is the correct foreign key field name
      plant_code: plant, // assuming this is the correct foreign key field name
      submittedBy: "swati", // assuming the user submitting the request
      materialGroup:material.materialGroup_id
    };
    
    await INSERT.into(MaterialRequisitions).entries(materialRequisition);

    return { message: 'Material requisition created successfully', ID: materialRequisition.ID };
  });

  this.on("clearCart", async (req) => {
    await DELETE.from(MaterialRequisitions);
    return { message: 'All material requisitions have been cleared' };
  });

  this.on("placeOrder", async (req) => {
    const materialRequisitions = await SELECT.from(MaterialRequisitions);
    if (materialRequisitions.length === 0) {
      return req.error(400, 'No items in the cart to place an order');
    }

    const orderID = cds.utils.uuid();
    const order = {
      ID: orderID,
      orderDate: new Date(),
      approvalStatus:'PENDING',
      plant:materialRequisitions[0].plant_code,
      materialGroup:materialRequisitions[0].materialGroup,
      placedBy: "swati" // assuming the user placing the order
    };

    await INSERT.into(Orders).entries(order);

    const orderItems = materialRequisitions.map(requisition => ({
      ID: cds.utils.uuid(), // generate a new unique ID for order items
      orderID: { ID: orderID }, // this is the Order ID to which the items belong
      materialCode: requisition.materialCode,
      materialName: requisition.materialName,
      quantity: Number(requisition.quantity), // convert to integer
      uom_name: requisition.uom_name,
      projectCode: requisition.projectCode_code,
      wbsNo: requisition.wbsNo_number,
    }));

    await INSERT.into(OrderItems).entries(orderItems);

    // Clear the cart after placing the order
    await DELETE.from(MaterialRequisitions);


    return { message: 'Order placed successfully', orderID: orderID };
  });

  this.after("placeOrder", async (orderData, req) => {
    const orderID = orderData.orderID;  // Get the order ID from the previous hook's response

    let dataOrderInfo = await SELECT.from(Orders, O => {
      O`.*`,
      O.items(I => {I`.*`})
    }).where({ID: orderID});

    if (dataOrderInfo[0].items.length < 1) {
      req.error({
        code: 'Order-item-missing',
        message: 'Please maintain at least 1 order item.',
        status: 417
      });
      return;
    }

    await UPDATE.entity(Orders, orderID).set({
      approvalStatus: 'PENDING',
      placedBy: 'swati'
    });

    let workflowContext = {}, sbpaWorkflowResponse, sbpaUserTaskInstances, orderApproval = {};
    workflowContext.orderId = dataOrderInfo[0].ID;
    workflowContext.orderdate = dataOrderInfo[0].orderDate.split('T')[0];
    workflowContext.placedby = dataOrderInfo[0].placedBy;
    workflowContext.materialgroup =dataOrderInfo[0].materialGroup;
    workflowContext.plant=dataOrderInfo[0].plant;
    workflowContext.orderitem = dataOrderInfo[0].items.map(item => ({
      materialCode: item.materialCode,
      materialName: item.materialName,
      quantity: item.quantity.toString(),
      uom_name: item.uom_name,
      projectCode: item.projectCode,
      wbsNo: item.wbsNo,
    }));

    // Call SBPA API to start the workflow
    try {
      // Start the workflow in SBPA
      let sbpaWorkflowResponse = await utilitySBPA.createOrderApprovalProcess(workflowContext);

      // Update the Order with workflowInstanceId
      await UPDATE.entity(Orders).where({ ID: orderID }).set({
        workflowInstanceId: sbpaWorkflowResponse.id
      });

      req.notify('Order has been submitted for approval!');
    } catch (error) {
      console.error('Error creating workflow in SBPA:', error);
      req.error({
        code: 'Workflow-Creation-Failed',
        message: 'Failed to create workflow for the order.',
        status: 500
      });
    }
});

this.on("getWorkflowStatus", async (req) => {
  const orderID = req.data.orderID;

  let orderData = await SELECT.one.from(Orders).where({ ID: orderID });

  if (!orderData || !orderData.workflowInstanceId) {
      req.error({
          code: 'Order-Not-Found',
          message: 'Order or associated workflow not found.',
          status: 404
      });
      return;
  }

  try {
      // Retrieve the status of the workflow from SBPA
      let workflowStatus = await utilitySBPA.getOrderApprovalProcess(orderData.workflowInstanceId);

      //req.reply(workflowStatus);
      // Update the approvalStatus in the Orders entity
      await UPDATE(Orders)
        .set({ approvalStatus: workflowStatus.status })
        .where({ ID: orderID });

      console.log(workflowStatus);
      return workflowStatus;
  } catch (error) {
      console.error('Error fetching workflow status:', error);
      req.error({
          code: 'Workflow-Status-Fetch-Failed',
          message: 'Failed to fetch the workflow status.',
          status: 500
      });
  }
});


};
