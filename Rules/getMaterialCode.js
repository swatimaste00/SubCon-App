/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function getMaterialCode(clientAPI) {

    let data = clientAPI.evaluateTargetPath('#Control:FCCode/#Value');
    alert(data);
    //return data;
}


