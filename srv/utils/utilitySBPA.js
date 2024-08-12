const apiSBPAWorkflowRuntime = require('../resources/api-clients/SPA_Workflow_Runtime/index').WorkflowInstancesApi;
const apiSBPAUserTaskRuntime = require('../resources/api-clients/SPA_Workflow_Runtime/index').UserTaskInstancesApi;
const destinationConfig = { destinationName: 'sbpa-subcon-approval-dest' };
//const sbpaProcessDefinitionId = 'eu10.sap-process-automation-tfe.kuokmaterialrequisitionapprovalprocess.approveMaterialRequisitionProcess';

const sbpaProcessDefinitionId = 'jp10.devtyo-tlgm9pd3.materialrequisitionapprovalprocess.approveMaterialRequisitionProcess';

createOrderApprovalProcess = async (inputContext) => {
  let contextBody = { definitionId: sbpaProcessDefinitionId, context: inputContext };
  try {
    return await apiSBPAWorkflowRuntime.createV1WorkflowInstances(contextBody).execute(destinationConfig);
  } catch (error) {
    console.log('Error in creating Instance of Approval Process');
    throw error;
  }
}

getOrderApprovalProcess = async (orderApprovalProcessInstnaceId)=>{ 
  try {
    return await apiSBPAWorkflowRuntime.getV1WorkflowInstancesByWorkflowInstanceId(orderApprovalProcessInstnaceId).execute(destinationConfig);
  } catch (error) {
    console.log('Error in getting Instance of JobSheet Approval Process')
  }  
}

getOrderApprovalProcessTaskInstances = async (orderApprovalProcessInstanceId) => {
  try {
    return await apiSBPAUserTaskRuntime.getV1TaskInstances({ workflowInstanceId: orderApprovalProcessInstanceId }).execute(destinationConfig);
  } catch (error) {
    console.log('Error in getting Task Instances of Order Approval Process');
    throw error;
  }
}

waitInSeconds = (seconds)=>{
    return new Promise(resolve => { setTimeout(resolve, seconds*1000); });
  }

module.exports = { createOrderApprovalProcess, getOrderApprovalProcessTaskInstances, waitInSeconds,getOrderApprovalProcess};
