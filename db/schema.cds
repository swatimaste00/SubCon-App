namespace kuok.subcon.db;

using {
    cuid,
    managed,
    User
} from '@sap/cds/common';

entity Materials {
    key code                 : String(100);
        name                 : String(20);
        uom                  : Association to one UoMs;
        descr                : String(100);
        materialGroup        : Association to one MaterialGroups; // a material belongs to a group
        wbsNo                : Association to one WBSElements;
        quantityAvlToBIssued : String;
        materialRequisition  : Association to MaterialRequisitions;
}

entity WBSElements {
    key number      : String(20);
        description : String(100);project : Association to Projects;
        
}

entity Plants{
    key code:String(10);
    name:String(50);

}

entity Projects {
    key code        : String(25);
        description : String(50);
        elements : Composition of many WBSElements on elements.project = $self;
}

entity MaterialGroups {
    key id   : String(50);
        name : String(100);
}

entity UoMs {
    key name        : String(20);
        description : String(100);
}

entity MaterialRequisitions {
    key ID                   : UUID;
        materials            : Composition of many Materials
                                   on materials.materialRequisition = $self;
        wbsNo                : Association to one WBSElements;
        materialCode         : String(50);
        materialGroup:String;
        quantity             : String;
        uom                  : Association to one UoMs;
        materialName         : String(50);
        plant                : Association to one Plants;
        projectCode          : Association to one Projects;
        quantityAvlToBIssued : String;
        submittedBy          : String(50);


}


entity MRApprovals : cuid, managed {
    orders             : Association to one Orders;
    taskInstanceId : UUID;
    level          : Int16;
    approver       : String(256);
    status         : String(20);
}

entity Orders {
    key ID                   : UUID;
        orderDate            : DateTime;
        placedBy             : String;
        workflowInstanceId   : UUID;
        workflowApproverNext : User;
        approvalStatus       : String(20);
        rejectionRemarks     : String(256);
        items : Composition of many OrderItems on items.orderID = $self;
        plant:String;
        materialGroup:String;
}

entity OrderItems {
    key ID           : UUID;
        orderID      : Association to Orders;
        materialCode : String;
        materialName : String;
        quantity     : Integer;
        uom_name     : String;
        projectCode  : String;
        wbsNo        : String;
}
