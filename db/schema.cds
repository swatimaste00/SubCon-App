namespace kuok.subcon.db;

using {
    cuid,
    managed,
    User
} from '@sap/cds/common';

entity SubContractorDetails{
    key emailId : String;
    customerID:String;
    customerName:String;
    Salesorg:String;
    date:Date;
    plant:String;
    project:String;
    department:String;
    approverName:String;
    approverEmailId:String;
    orders: Composition of many Orders on orders.subcontractor = $self;

}

entity Materials {
    key code                 : String;
        name                 : String;
        uom                  : String;
        plant:Association to one Plants;
}

entity WBSElements {
    key number      : String(255);
        description : String(255);
        project : Association to Projects;
        
}

entity Plants{
    key code:String(255);
    name:String(255);

}

entity Departments{
    key code:String(255);
    plant:Association to one Plants;
    name:String(255);
    approverName:String;
    approverEmailId:String;

}

entity Projects {
    key code        : String(255);
        description : String(255);
        elements : Composition of many WBSElements on elements.project = $self;
}

entity MaterialGroups {
    key id   : String(255);
        name : String(255);
        plant:Association to one Plants;
}

entity UoMs {
    key name        : String(20);
        description : String(255);
}

entity MaterialRequisitions {
    key ID                   : Integer64;
        wbsNo                : String(255);
        materialCode         : String(255);
        materialGroup:String;
        quantity             : Integer;
        uom                  : String;
        materialName         : String(255);
        requirementDate: DateTime;
        quantityAvlToBIssued : String;
        submittedBy          : String(255);
        ImReqDate:String;


}


entity MRApprovals : cuid, managed {
    orders             : Association to one Orders;
    taskInstanceId : UUID;
    level          : Int16;
    approver       : String(256);
    status         : String(255);
}

entity Orders {
    key RequestNo                   : Integer64;
        ImReqDate:String;
        orderDate            : DateTime;
        DistrChan:String;
        Division:String;
        placedBy             : String;
        workflowInstanceId   : UUID;
        workflowApproverNext : User;
        approvalStatus       : String(255);
        rejectionRemarks     : String(256);
        items : Composition of many OrderItems on items.RequestNo = $self;
        subcontractor:Association to one SubContractorDetails;
}

entity OrderItems {
    key ID           : UUID;
        RequestNo      : Association to Orders;
        Itemno:Integer;
        Plant:String;
        MatCode:String;
        MatText:String;
        UoM:String;
        ReqQty:Integer;
        IssQty:Integer;
        PrjCode:String;
        SeqCode:String; // WBS no
}

