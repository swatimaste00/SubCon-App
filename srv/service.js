const cds = require('@sap/cds');

module.exports = async function () {

  const db = await cds.connect.to('db'); // connect to database service
  const { Materials, MaterialRequisitions ,Orders,OrderItems, Z_SUBC_PLANT_C } = db.entities; // get reflected definitions

  const externalService = await cds.connect.to('PLANTDETAILS');

  this.on(["READ"], [Z_SUBC_PLANT_C], async (req) => {
    const apiS4ProudctSrv = await cds.connect.to('metadata');
    return await apiS4ProudctSrv.run(req.query);
  });

  this.on('READ', 'Materials', async (req) => {
    try {
      const result = await externalService.tx(req).run(req.query);
      console.log("Data from destination service:", result);
      return result;
    } catch (err) {
      console.error("Error fetching data from destination service:", err);
      return [];
    }
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
      placedBy: "swati" // assuming the user placing the order
    };

    await INSERT.into(Orders).entries(order);

    const orderItems = materialRequisitions.map(requisition => ({
      ID: cds.utils.uuid(), // generate a new unique ID for order items
      orderID: { ID: orderID },
      materialCode: requisition.materialCode,
      quantity: Number(requisition.quantity), // convert to integer
      uom_name: requisition.uom_name,
      materialName: requisition.materialName
    }));

    await INSERT.into(OrderItems).entries(orderItems);

    // Clear the cart after placing the order
    await DELETE.from(MaterialRequisitions);

    return { message: 'Order placed successfully', orderID: orderID };
  });

};
