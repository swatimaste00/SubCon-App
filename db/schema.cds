namespace kuok.subcon.db;

using {
    cuid,
    managed,
    User
} from '@sap/cds/common';

entity SubContractorDetails{
    key emailId : String;
    customerID:Int16;
    customerName:String;
    vkOrg:String;
    date:Date;
    plant:Association to one Plants;
    project:Association to one Projects;
    department:Association to one Departments;
    approverName:String;
    approverEmailId:String;
    orders: Composition of many Orders on orders.subcontractor = $self;

}

entity Materials {
    key code                 : String(100);
        name                 : String(20);
        uom                  : String;
        descr                : String(100);
        materialGroup        : Association to one MaterialGroups; // a material belongs to a group
        wbsNo                : Association to one WBSElements;
        quantityAvlToBIssued : String;
        materialDepartment:String;
        materialRequisition  : Association to MaterialRequisitions;
        plant:Association to one Plants;
}

entity WBSElements {
    key number      : String(20);
        description : String(100);project : Association to Projects;
        
}

entity Plants{
    key code:String(10);
    name:String(50);

}

entity Departments{
    key code:String(10);
    plant:Association to one Plants;
    name:String(50);
    approverName:String;
    approverEmailId:String;

}

entity Projects {
    key code        : String(25);
        description : String(50);
        elements : Composition of many WBSElements on elements.project = $self;
}

entity MaterialGroups {
    key id   : String(50);
        name : String(100);
        plant:Association to one Plants;
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
        uom                  : String;
        materialName         : String(50);
        requirementDate: Date;
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
    key ID                   : String(14);
        orderDate            : DateTime;
        placedBy             : String;
        workflowInstanceId   : UUID;
        workflowApproverNext : User;
        approvalStatus       : String(20);
        rejectionRemarks     : String(256);
        items : Composition of many OrderItems on items.orderID = $self;
        materialGroup:String;
        subcontractor:Association to one SubContractorDetails;
}

entity OrderItems {
    key ID           : UUID;
        orderID      : Association to Orders;
        materialCode : String;
        materialName : String;
        quantity     : Integer;
        uom     : String;
        wbsNo        : String;
        requirementDate:Date;
}

