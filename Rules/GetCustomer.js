/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function GetCustomer(clientAPI) {
    //let currentUser = clientAPI.evaluateTargetPath("#Application/#AppData/UserId");
    let currentUser = 'swati.maste@sap.com';
    console.log("current user is " + currentUser);
    let entity = `$filter=email eq '${currentUser}'`;
    console.log("entity " + entity);
    return clientAPI.read('/SubConApp/Services/SubCon.service','Z_SUBC_CUST_C', [], entity).then(result => {
        if(result){
            let data = result.getItem(0);
            clientAPI.getPageProxy().setActionBinding(data);
            return  clientAPI.getPageProxy().executeAction({
                "Name": "/SubConApp/Actions/GenericNavigation.action",
		"Properties": {
			"PageToOpen": "/SubConApp/Pages/SubConDetails.page"
		}
            })
            
            
        }
    });

}
