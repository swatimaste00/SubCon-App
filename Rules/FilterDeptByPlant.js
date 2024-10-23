/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */


export default function FilterDeptByPlant(context) {
    let pageProxy = context.getPageProxy();
    let plantPicker = pageProxy.getControl('SectionedTable0').getSection('SectionFormCell0').getControl('FCSetPlant');
    let plantTypeValue = plantPicker.getValue()[0].ReturnValue;
    let DepartmentPicker = pageProxy.getControl('SectionedTable0').getSection('SectionFormCell0').getControl('FCDept');
    let specifier = DepartmentPicker.getTargetSpecifier();
    let qo = `$filter=werks eq '${plantTypeValue}'`;
    specifier.setQueryOptions(qo);
    DepartmentPicker.setTargetSpecifier(specifier);
}


