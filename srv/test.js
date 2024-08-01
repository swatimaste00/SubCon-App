const cds = require('@sap/cds');

module.exports = async function () {

  const db = await cds.connect.to('db'); // connect to database service
  const { Materials, MaterialRequisitions } = db.entities; // get reflected definitions

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

    // Create a new material requisition entry
    const materialRequisition = {
      ID: cds.utils.uuid(), // generate a unique ID
      materialCode:req.data.materialCode,
      quantity:req.data.quantity,
      uom_ID: uom,
      materialName:materialName,
      wbsNo_number: wbsNo, // assuming this is the correct foreign key field name
      projectCode_code: projectCode, // assuming this is the correct foreign key field name
      plant_code: plant, // assuming this is the correct foreign key field name
      submittedBy: "swati", // assuming the user submitting the request
    };
    
    await INSERT.into(MaterialRequisitions).entries(materialRequisition);

    return { message: 'Material requisition created successfully', ID: materialRequisition.ID };
  });

};
