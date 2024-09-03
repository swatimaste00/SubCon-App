using { kuok.subcon.db as db } from '../db/schema';
using { metadata as external } from './external/metadata';


service SubConService @(path:'/cart') { 
  entity Materials as projection on db.Materials;
  entity MaterialGroups as projection on db.MaterialGroups;
  entity MaterialRequisitions as projection on db.MaterialRequisitions;
  entity Orders as projection on db.Orders;
  entity OrderItems as projection on db.OrderItems;
  entity UoMs as projection on db.UoMs;
  entity WBSElements as projection on db.WBSElements;
  entity Plants as projection on db.Plants;
  entity Projects as projection on db.Projects;
  entity Z_SUBC_PLANT_C as projection on external.Z_SUBC_PLANT_C;
  entity MRApprovals as projection on db.MRApprovals;
  entity SubContractorDetails as projection on db.SubContractorDetails;
  action requestMaterial(  materialCode: String,quantity : String, wbsNo:String,requirementDate:Date);
  action clearCart();
  action placeOrder();
  action getWorkflowStatus(orderID:UUID);
  action setplantAndProjectDetails(plant : String,projectCode: String);
}

type MaterialData {
  materialCode: String;
    quantity : Integer;
    wbsNo:String;
    plant : String;
    projectCode: String;

}