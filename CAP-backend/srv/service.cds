using { kuok.subcon.db as db } from '../db/schema';
using {Z_SUBC_PROJ_C_CDS as Project} from './external/Z_SUBC_PROJ_C_CDS';
using {Z_SUBC_PLANT_C_CDS as Plant} from './external/Z_SUBC_PLANT_C_CDS';
using {Z_SUBC_DEPT_C_CDS as Dept} from './external/Z_SUBC_DEPT_C_CDS';
using {Z_SUBC_WBS_C_CDS as Wbs} from './external/Z_SUBC_WBS_C_CDS';
using {Z_SUBC_MATKL_C_CDS as MaterialGroup} from './external/Z_SUBC_MATKL_C_CDS';
using {Z_SUBC_MATNR_C_CDS as Material} from './external/Z_SUBC_MATNR_C_CDS';
using {Z_SUBC_CUST_C_CDS as Customer} from './external/Z_SUBC_CUST_C_CDS';
using {ZAPI_001_RFC_SUBCON_REQ_POST_SRV as DO} from './external/ZAPI_001_RFC_SUBCON_REQ_POST_SRV';


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
  entity Z_SUBC_PLANT_C as projection on Plant.Z_SUBC_PLANT_C;
  entity Z_SUBC_PROJ_C as projection on Project.Z_SUBC_PROJ_C;
  entity Z_SUBC_wbs_C as projection on Wbs.Z_SUBC_wbs_C;
  entity Z_SUBC_DEPT_C as projection on Dept.Z_SUBC_DEPT_C;
  entity Z_SUBC_MATKL_C as projection on MaterialGroup.Z_SUBC_MATKL_C;
  entity Z_SUBC_MATNR_C as projection on Material.Z_SUBC_MATNR_C;
  entity Z_SUBC_CUST_C as projection on Customer.Z_SUBC_CUST_C;
  entity MRApprovals as projection on db.MRApprovals;
  entity OrderStatusResult as projection on db.OrderStatusResult;
  entity SubContractorDetails as projection on db.SubContractorDetails;
  entity Departments as projection on db.Departments;
  entity ZAPI_001_RFC_SUBCON_REQ_POST_SRV as projection on DO.SubconRequestSet;
  action requestMaterial(  materialCode: String,quantity : String, wbsNo:String,requirementDate:DateTime,loggedInUserId:String);
  action clearCart();
  action placeOrder();
  action getWorkflowStatus();
  action setplantProjectDeptDetails(customerID:String, customerName:String, plant : String, projectCode: String, department :String, vkOrg:String,loggedInUserId:String);
  action createDO();
}
