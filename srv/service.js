const cds = require('@sap/cds');
const utilitySBPA = require("./utils/utilitySBPA");
const unixTimeConverter =require("./utils/unixTimeConverter");
const { uuid } = cds.utils;

module.exports = async function () {

  const db = await cds.connect.to('db'); // connect to database service
  const { Materials, MaterialRequisitions ,Orders,OrderItems,Z_SUBC_CUST_C, Z_SUBC_PLANT_C,Z_SUBC_DEPT_C,Z_SUBC_PROJ_C,Z_SUBC_wbs_C,Z_SUBC_MATKL_C,Z_SUBC_MATNR_C,MRApprovals,Plants,Projects,WBSElements, SubContractorDetails,Departments} = cds.entities; // get reflected definitions


//   this.on("READ", "SubContractorDetails", async (req) => {
//     const email = cds.context.user.id;
//     var subcontractor = await SELECT.one.from(SubContractorDetails).where({ emailId: email });
//     return subcontractor;

// });


 // destination
  this.on('READ', 'Z_SUBC_PLANT_C', async (req) => {
    const apiS4Srv = await cds.connect.to("Z_SUBC_PLANT_C_CDS");
    let response = await apiS4Srv.run(req.query);
    console.log("response", response);
    return response;
  });

  this.on('READ', 'Z_SUBC_CUST_C', async (req) => {
    const apiS4Srv = await cds.connect.to("Z_SUBC_CUST_C_CDS");
    let response = await apiS4Srv.run(req.query);
    console.log("response", response);
    return response;
  });

  this.on('READ', 'Z_SUBC_DEPT_C', async (req) => {
    const apiS4Srv = await cds.connect.to("Z_SUBC_DEPT_C_CDS");
    let response = await apiS4Srv.run(req.query);
    console.log("response", response);
    return response;
  });

  this.on('READ', 'Z_SUBC_MATKL_C', async (req) => {
    const apiS4Srv = await cds.connect.to("Z_SUBC_MATKL_C_CDS");
    let response = await apiS4Srv.run(req.query);
    console.log("response", response);
    return response;
  });

  this.on('READ', 'Z_SUBC_MATNR_C', async (req) => {
    const apiS4Srv = await cds.connect.to("Z_SUBC_MATNR_C_CDS");
    let response = await apiS4Srv.run(req.query);
    console.log("response", response);
    return response;
  });

  this.on('READ', 'Z_SUBC_PROJ_C', async (req) => {
    const apiS4Srv = await cds.connect.to("Z_SUBC_PROJ_C_CDS");
    let response = await apiS4Srv.run(req.query);
    console.log("response", response);
    return response;
  });

  this.on('READ', 'Z_SUBC_wbs_C', async (req) => {
    const apiS4Srv = await cds.connect.to("Z_SUBC_WBS_C_CDS");
    let response = await apiS4Srv.run(req.query);
    console.log("response", response);
    return response;
  });
  
  //Z_SUBC_DEPT_C_CDS API
  this.on('READ', 'Departments', async (req) => {
    const apiS4Srv = await cds.connect.to("Z_SUBC_DEPT_C_CDS");
    let response = await apiS4Srv.run(SELECT.from('Z_SUBC_DEPT_C'));
    //let response = await apiS4Srv.send({ method: 'GET', path: 'Z_SUBC_DEPT_C' });

    //console.log("response", response);
  
    // Transform the response to map werks -> code and name1 -> name
    const transformedData = response.map(item => ({
      code: item.kostl,
      name: item.KTEXT,
      approverName:item.verak_user,
      approverEmailId:item.SMTP_ADDR,
      plant_code:item.werks
    }));
  
    //console.log('Hello transformedData',transformedData);
    transformedData['$count'] = transformedData.length;
  
    return transformedData;
  });
  

    //Z_SUBC_MATKL_C_CDS API
    this.on('READ', 'MaterialGroups', async (req) => {
      const apiS4Srv = await cds.connect.to("Z_SUBC_MATKL_C_CDS");
      let response = await apiS4Srv.run(SELECT.from('Z_SUBC_MATKL_C'));
      //let response = await apiS4Srv.send({ method: 'GET', path: 'Z_SUBC_MATKL_C' });
  
      //console.log("response", response);
    
      // Transform the response to map werks -> code and name1 -> name
      const transformedData = response.map(item => ({
        id: item.matkl,
        name: item.wgbez60,
        plant_code:item.werks
      }));
    
      //console.log('Hello transformedData',transformedData);
      transformedData['$count'] = transformedData.length;
    
      return transformedData;
    });
    
     //Z_SUBC_MATNR_C_CDS API
     this.on('READ', 'Materials', async (req) => {
      const apiS4Srv = await cds.connect.to("Z_SUBC_MATNR_C_CDS");
      let response = await apiS4Srv.run(SELECT.from('Z_SUBC_MATNR_C'));
      //let response = await apiS4Srv.send({ method: 'GET', path: 'Z_SUBC_MATNR_C' });
  
      //console.log("response", response);
    
      //response = response.slice(0, 20);
      // Transform the response to map werks -> code and name1 -> name
      const transformedData = response.map(item => ({
        code: item.matnr,
        name: item.maktx,
        uom:item.meins,
        plant_code:item.werks,
      }));

    
      console.log('Hello transformedData',transformedData);
      transformedData['$count'] = transformedData.length;
    
      return transformedData;
    });

  // this.on('READ', 'Plants', async (req) => {
  //   const apiS4Srv = await cds.connect.to("metadata");
  //   let response = await apiS4Srv.run(SELECT.from('Z_SUBC_PLANT_C'));
  //   //let response = await apiS4Srv.send({ method: 'GET', path: 'Z_SUBC_PLANT_C' });
  
  //   // Transform the response to map werks -> code and name1 -> name
  //   const transformedData = response.map(item => ({
  //     code: item.werks,
  //     name: item.name1
  //   }));
  
  //   //console.log('transformedData',transformedData);
  //   transformedData['$count'] = transformedData.length;
  
  //   return transformedData;
  // });

  //Testing DO

  this.on('READ', 'Plants', async (req) => {
    var payload ={"Salesorg":"DA11","DistrChan":"MI","Division":"00","ShipTo":"0024000051","RequestNo":"7125","Bname":"VASEEM.M","RequestedBy":"VASEEM.M","ImReqDate":"\/Date(1726006830000)\/","ProcessingType":"3","AppIdImp":"","Delivery":"","Items":[{"RequestNo":"7125","Itemno":"1","Plant":"DA11","MatCode":"ABRA-011-01-0003","MatText":"","Uom":"EA","ReqQty":"20","IssQty":"7","PrjCode":"ST04800","SeqCode":"ST04800.T.E00001"},{"RequestNo":"7125","Itemno":"2","Plant":"DA11","MatCode":"ABRA-011-01-0003","MatText":"","Uom":"EA","ReqQty":"20","IssQty":"7","PrjCode":"ST04800","SeqCode":"ST04800.T.E00001"}]};
    
    try{
      const apiS4Srv = await cds.connect.to("ZAPI_001_RFC_SUBCON_REQ_POST_SRV");
    let response = await apiS4Srv.send({
      method: 'POST',
      data: payload,  // Sending payload as body
      headers: { 'X-Requested-With': 'X' }
    });
    console.log("Create DO response", response);
    return response;

    }catch(error){
      console.log("error in creating DO",error)
    }
    
  });


  
  this.on('READ', 'Projects', async (req) => {
    const apiS4Srv = await cds.connect.to("Z_SUBC_PROJ_C_CDS");
    let response = await apiS4Srv.run(SELECT.from('Z_SUBC_PROJ_C'));
    //let response = await apiS4Srv.send({ method: 'GET', path: 'Z_SUBC_PROJ_C' });
    //console.log(response);

    const transformedData = response.map(item => ({
      code: item.pspid,
      description: item.post1
    }));
  
    //console.log('transformedData',transformedData);
    transformedData['$count'] = transformedData.length;
    return transformedData;
  

    //return { message: 'Data fetched and stored successfully' };
  });

  this.on('READ', 'WBSElements', async (req) => {
    const apiS4Srv = await cds.connect.to("Z_SUBC_WBS_C_CDS");
    let response = await apiS4Srv.run(SELECT.from('Z_SUBC_wbs_C'));
    //let response = await apiS4Srv.send({ method: 'GET', path: 'Z_SUBC_wbs_C' });
    //console.log(response);

    const transformedData = response.map(item => ({
      number: item.posid,
      description: item.post1_wbs,
      project_code:item.pspid

    }));
  
    //console.log('transformedData',transformedData);
    transformedData['$count'] = transformedData.length;
  
    return transformedData;
  
  });

  this.on("setplantProjectDeptDetails", async (req) => {
    const { customerID, customerName,plant, projectCode, department, vkOrg ,loggedInUserId } = req.data;

    // Get the email of the currently logged-in user
    var { email } = loggedInUserId;
    if (!email) {
        email = "swati.maste@sap.com";
    }
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB').split('/').join('-');

    // Fetch the approver details from the Departments entity based on the selected department
    const apiS4Srv = await cds.connect.to("Z_SUBC_DEPT_C_CDS");
    let response = await apiS4Srv.run(SELECT.one.from('Z_SUBC_DEPT_C').where({ kostl: department }));
    if (!response) {
      return req.error(404, `Department with code ${department} not found`);
  }

    const Group = await cds.connect.to("Z_SUBC_MATKL_C_CDS");
    let materialGroup = await Group.run(SELECT.from('Z_SUBC_MATKL_C').columns `matkl`.where({ werks: plant }));


    var details = {
        emailId: email,
        customerID: customerID,
        customerName: customerName,
        Salesorg: vkOrg,
        date: new Date(),
        plant: plant,
        project: projectCode,
        department: department,
        approverName: response.verak_user,
        approverEmailId: response.SMTP_ADDR
    };

    console.log(details);

    // Check if an entry with the same email already exists in SubContractorDetails
    let existingEntry = await SELECT.one.from(SubContractorDetails).where({ emailId: email });

    if (existingEntry) {
        // If the entry exists, update it with the latest details
        await UPDATE(SubContractorDetails).set(details).where({ emailId: email });
        console.log("Update Success");
    } else {
        // If no entry exists, insert a new one
        await INSERT.into(SubContractorDetails).entries(details);
        console.log("Insert Success");
    }

});



  this.on("requestMaterial", async (req) => {
    const { materialCode, quantity, wbsNo ,requirementDate,loggedInUserId} = req.data;
    

    const apiS4Srv = await cds.connect.to("Z_SUBC_MATNR_C_CDS");
    let material = await apiS4Srv.run(SELECT.one.from('Z_SUBC_MATNR_C').where({ matnr: materialCode }));
    if (!material) {
      return req.error(404, `Material with code ${materialCode} not found`);
  }

    // Fetch uom and materialName from the Materials entity
    const uom = material.meins;
    const materialName = material.maktx;
    const requestedQuantity = Number(quantity);
    const materialGroup =material.matkl;
    console.log("material.matkl",material.matkl);

    const date = new Date();
    const ReqNo = date.getFullYear().toString() +
                ("0" + (date.getMonth() + 1)).slice(-2) +
                ("0" + date.getDate()).slice(-2) +
                ("0" + date.getHours()).slice(-2) +
                ("0" + date.getMinutes()).slice(-2) +
                ("0" + date.getSeconds()).slice(-2);

    const requirementDateObj = new Date(requirementDate);

    // Convert requirementDate to Unix timestamp (milliseconds)
    if (isNaN(requirementDateObj.getTime())) {
        return req.error(400, "Invalid requirementDate format");
    }
    
    const ImReqDate = requirementDateObj.getTime(); // Convert to Unix time
    const formattedImReqDate = `\\/Date(${ImReqDate})\\/`; 


    const materialRequisition = {
      ID: ReqNo.toString(), // generate a unique ID
      materialCode:req.data.materialCode,
      quantity:requestedQuantity,
      ImReqDate:formattedImReqDate,
      uom: uom,
      requirementDate:requirementDate,
      materialName:materialName,
      wbsNo: wbsNo, // assuming this is the correct foreign key field name
      submittedBy: loggedInUserId, // assuming the user submitting the request
      materialGroup:materialGroup
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
    const SubContractorInfo = await SELECT.one.from(SubContractorDetails).where({emailId:materialRequisitions[0].submittedBy}); // add the where emailId=cds.context.user.id clause later.
    let itemcount=0;
    let payloadWithIssuedQty;

    if (materialRequisitions.length === 0) {
      return req.error(400, 'No items in the cart to place an order');
    }

    const items = materialRequisitions.map(requisition => ({
      RequestNo: requisition.ID.toString(), // this is the Order ID to which the items belong
      Itemno:(++itemcount).toString(),
      Plant:SubContractorInfo.plant,
      MatCode: requisition.materialCode,
      MatText: requisition.materialName,
      ReqQty: requisition.quantity.toString(), // convert to integer
      Uom: requisition.uom,
      PrjCode:SubContractorInfo.project,
      SeqCode: requisition.wbsNo,
    }));

    var payload ={

      Salesorg:SubContractorInfo.Salesorg,
      DistrChan:"MI",
      Division:"00",
      ShipTo:SubContractorInfo.customerID,
      RequestNo:materialRequisitions[0].ID,
      Bname:SubContractorInfo.emailId.split('@')[0],
      RequestedBy:SubContractorInfo.emailId.split('@')[0],
      ImReqDate:materialRequisitions[0].ImReqDate,
      ProcessingType:"1",
      AppIdImp:"",
      Delivery:"",
      Items:items
    }


    try{
      const apiS4Srv = await cds.connect.to("ZAPI_001_RFC_SUBCON_REQ_POST_SRV"); 
      payloadWithIssuedQty = await apiS4Srv.send({
        method: 'POST',
        path: '/SubconRequestSet',
        data: payload,  // Sending payload as body
        headers: { 'X-Requested-With': 'X' }
      });
  
      console.log("DO quantity check successful");
      //return payloadWithIssuedQty;

    }catch(error){
      console.log("error DO quantity check",error)
    }

    if (payloadWithIssuedQty && payloadWithIssuedQty.Items) {
      const order = {
          RequestNo: materialRequisitions[0].ID.toString(),
          orderDate: new Date(),
          ImReqDate: materialRequisitions[0].ImReqDate,
          approvalStatus: 'PENDING',
          DistrChan: "MI",
          Division: "00",
          department:SubContractorInfo.department,
          approverName: SubContractorInfo.approverName,
          approverEmailId: SubContractorInfo.approverEmailId,
          placedBy: SubContractorInfo.emailId // assuming the user placing the order
      };
  
      await INSERT.into(Orders).entries(order);
      //console.log("Order Placed with ID",order.RequestNo)
  
      const orderItems = payloadWithIssuedQty.Items.map((item) => ({
          ID: cds.utils.uuid(),
          RequestNo_RequestNo: materialRequisitions[0].ID.toString(),
          Itemno: item.Itemno.toString(),
          Plant: item.Plant,
          MatCode: item.MatCode,
          MatText: item.MatText,
          ReqQty: item.ReqQty.toString(),
          IssQty: item.IssQty.toString(),
          Uom: item.Uom,
          PrjCode: item.PrjCode,
          SeqCode: item.SeqCode
      }));
  
      await INSERT.into(OrderItems).entries(orderItems);
  } else {
      console.log("No payloadWithIssuedQty data to process.");
  }

    // Clear the cart after placing the order
    await DELETE.from(MaterialRequisitions);

    console.log("Order Placed",{ RequestNo: materialRequisitions[0].ID.toString()})
    return { 
      RequestNo: materialRequisitions[0].ID.toString(),
      emailId: SubContractorInfo.emailId
    };

  });

  this.after("placeOrder", async (orderData, req) => {
    console.log("OrderData", orderData);
    console.log("Req",req.data);
    const { RequestNo, emailId } = orderData; 
    // Get the order ID from the previous hook's response

  
    let dataOrderInfo = await SELECT.from(Orders, O => {
      O`.*`,
      O.items(I => {I`.*`})
    }).where({RequestNo: RequestNo});

    const SubContractorInfo = await SELECT.one.from(SubContractorDetails).where({emailId:emailId});


    if (dataOrderInfo[0].items.length < 1) {
      req.error({
        code: 'Order-item-missing',
        message: 'Please maintain at least 1 order item.',
        status: 417
      });
      return;
    }

    let workflowContext = {}, sbpaWorkflowResponse, sbpaUserTaskInstances, orderApproval = {}, itemCount=0;
    workflowContext.salesorg = SubContractorInfo.Salesorg;
    workflowContext.distrchan = dataOrderInfo[0].DistrChan;
    workflowContext.division = dataOrderInfo[0].Division;
    workflowContext.shipto = SubContractorInfo.customerID;
    workflowContext.requestno = dataOrderInfo[0].RequestNo;
    workflowContext.bname = dataOrderInfo[0].placedBy.split('@')[0];
    workflowContext.requestedby = dataOrderInfo[0].placedBy.split('@')[0];
    workflowContext.imreqdate = dataOrderInfo[0].ImReqDate;
    workflowContext.processingtype = "3";
    workflowContext.appidimp = "";
    workflowContext.delivery = "";
    workflowContext.orderdate = dataOrderInfo[0].orderDate.split('T')[0].toString();
    workflowContext.approvername = SubContractorInfo.approverName;
    workflowContext.approveremailid = SubContractorInfo.approverEmailId;
    workflowContext.items = dataOrderInfo[0].items.map(item => ({
      Uom: item.Uom,
      RequestNo:item.RequestNo_RequestNo,
      Itemno : item.Itemno,
      Plant:item.Plant,
      MatCode: item.MatCode,
      MatText: item.MatText,
      ReqQty: item.ReqQty.toString(),
      IssQty: item.IssQty.toString(),
      PrjCode: item.PrjCode,
      SeqCode: item.SeqCode,
    }));

    // Call SBPA API to start the workflow
    try {
      // Start the workflow in SBPA
      let sbpaWorkflowResponse = await utilitySBPA.createOrderApprovalProcess(workflowContext);

      // Update the Order with workflowInstanceId
      await UPDATE.entity(Orders).where({ RequestNo: RequestNo}).set({
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
  try {
    // Retrieve all orders where workflowInstanceId is present
    let orders = await SELECT.from(Orders).where({ workflowInstanceId: { '!=': null } });

    if (!orders || orders.length === 0) {
      req.error({
        code: 'Orders-Not-Found',
        message: 'No orders with workflow instances found.',
        status: 404
      });
      return [];
    }

    // Array to store status updates
    let statusUpdates = [];

    // Iterate through all orders and fetch workflow status
    for (const order of orders) {
      try {
        let workflowStatus = await utilitySBPA.getOrderApprovalProcess(order.workflowInstanceId);

        // Update the approvalStatus in the Orders entity
        await UPDATE(Orders)
          .set({ approvalStatus: workflowStatus.status })
          .where({ RequestNo: order.RequestNo });

        // Add the order and its status to the statusUpdates array
        statusUpdates.push({
          RequestNo: order.RequestNo,
          approvalStatus: workflowStatus.status
        });

      } catch (error) {
        console.error(`Error fetching workflow status for Order ${order.RequestNo}:`, error);
      }
    }

    // Return the status updates for all processed orders
    return statusUpdates;

  } catch (error) {
    console.error('Error fetching orders or workflow statuses:', error);
    req.error({
      code: 'Workflow-Status-Fetch-Failed',
      message: 'Failed to fetch workflow statuses for orders.',
      status: 500
    });
  }
});


};
