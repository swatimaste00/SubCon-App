/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function filterCustomer(clientAPI) {
    let currentUser = clientAPI.evaluateTargetPath("#Application/#AppData/UserId");
    let entity = `Z_SUBC_CUST_C?$filter=email eq '${currentUser}'`;
    return entity;
}
