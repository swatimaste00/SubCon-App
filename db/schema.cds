namespace kuok.subcon.db;

using {
    cuid,
    managed,
    User
} from '@sap/cds/common';

entity Materials {
    key code          : String(100);
        name : String(20);
        uom           : Association to one UoMs;
        descr         : String(100);
        materialGroup : Association to one MaterialGroups; // a material belongs to a group
        wbsNo         : Association to one WBSElements;
        quantityAvlToBIssued: String;
        materialRequisition: Association to MaterialRequisitions;   
}

entity WBSElements {
    key number      : String(20);
        description : String(100);
}

entity Plants{
    key code:String(10);
    name:String(50);

}

entity Projects{
    key code:String(25);
    description:String(50);
}

entity MaterialGroups {
    key id        : String(50);
        name : String(100);
}

entity UoMs {
    key name        : String(20);
        description : String(100);
}

entity MaterialRequisitions {
    key ID:UUID;
    materials : Composition of many Materials on materials.materialRequisition= $self;
    wbsNo         : Association to one WBSElements;
    materialCode: String(50);
    quantity : String;
    uom : Association to one UoMs;
    materialName:String(50);
    plant : Association to one Plants;
    projectCode: Association to one Projects;
    quantityAvlToBIssued: String;
    submittedBy: String(50);

}

entity Orders {
  key ID : UUID;
  orderDate : DateTime;
  placedBy : String;
}

entity OrderItems {
  key ID : UUID;
  orderID : Association to Orders;
  materialCode : String;
  quantity : Integer;
  uom_name : String;
  materialName : String;
}