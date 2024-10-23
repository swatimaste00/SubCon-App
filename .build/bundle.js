(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/SubConApp/i18n/i18n.properties":
/*!**********************************************************!*\
  !*** ./build.definitions/SubConApp/i18n/i18n.properties ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/SubConApp/Rules/Application/AppUpdateFailure.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/SubConApp/Rules/Application/AppUpdateFailure.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/SubConApp/Actions/Application/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/SubConApp/Rules/Application/AppUpdateSuccess.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/SubConApp/Rules/Application/AppUpdateSuccess.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/SubConApp/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/SubConApp/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/SubConApp/Rules/Application/ClientIsMultiUserMode.js":
/*!********************************************************************************!*\
  !*** ./build.definitions/SubConApp/Rules/Application/ClientIsMultiUserMode.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClientIsMultiUserMode)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ClientIsMultiUserMode(clientAPI) {
    return clientAPI.isAppInMultiUserMode();
}

/***/ }),

/***/ "./build.definitions/SubConApp/Rules/Application/GetClientSupportVersions.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/SubConApp/Rules/Application/GetClientSupportVersions.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientSupportVersions)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientSupportVersions(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    let versionStr = '';
    Object.keys(versionInfo).forEach(function(key, index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        //console.log(`Key: ${key}   Index: ${index}`);
        if (key != 'Application Version') {
            versionStr += `${key}: ${versionInfo[key]}\n`;
        }
    });
    return versionStr;
}

/***/ }),

/***/ "./build.definitions/SubConApp/Rules/Application/GetClientVersion.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/SubConApp/Rules/Application/GetClientVersion.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientVersion)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientVersion(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    if (versionInfo.hasOwnProperty('Application Version')) {
        return versionInfo['Application Version'];
    }
}

/***/ }),

/***/ "./build.definitions/SubConApp/Rules/Application/OnWillUpdate.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/SubConApp/Rules/Application/OnWillUpdate.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/SubConApp/Actions/Application/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return Promise.resolve();
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/SubConApp/Rules/Application/ResetAppSettingsAndLogout.js":
/*!************************************************************************************!*\
  !*** ./build.definitions/SubConApp/Rules/Application/ResetAppSettingsAndLogout.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ResetAppSettingsAndLogout(clientAPI) {
    let logger = clientAPI.getLogger();
    let platform = clientAPI.nativescript.platformModule;
    let appSettings = clientAPI.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = clientAPI.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return clientAPI.getPageProxy().executeAction('/SubConApp/Actions/Application/Reset.action');
    }
}

/***/ }),

/***/ "./build.definitions/SubConApp/Rules/FilterDeptByPlant.js":
/*!****************************************************************!*\
  !*** ./build.definitions/SubConApp/Rules/FilterDeptByPlant.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilterDeptByPlant)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */


function FilterDeptByPlant(context) {
    let pageProxy = context.getPageProxy();
    let plantPicker = pageProxy.getControl('SectionedTable0').getSection('SectionFormCell0').getControl('FCSetPlant');
    let plantTypeValue = plantPicker.getValue()[0].ReturnValue;
    let DepartmentPicker = pageProxy.getControl('SectionedTable0').getSection('SectionFormCell0').getControl('FCDept');
    let specifier = DepartmentPicker.getTargetSpecifier();
    let qo = `$filter=werks eq '${plantTypeValue}'`;
    specifier.setQueryOptions(qo);
    DepartmentPicker.setTargetSpecifier(specifier);
}




/***/ }),

/***/ "./build.definitions/SubConApp/Rules/GetCustomer.js":
/*!**********************************************************!*\
  !*** ./build.definitions/SubConApp/Rules/GetCustomer.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetCustomer)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetCustomer(clientAPI) {
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


/***/ }),

/***/ "./build.definitions/SubConApp/Rules/Logging/LogLevels.js":
/*!****************************************************************!*\
  !*** ./build.definitions/SubConApp/Rules/Logging/LogLevels.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogLevels)
/* harmony export */ });
function LogLevels(clientAPI) {
    var levels = [];
    levels.push({
        'DisplayValue': 'Error',
        'ReturnValue': 'Error',
    });
    levels.push({
        'DisplayValue': 'Warning',
        'ReturnValue': 'Warn',
    });
    levels.push({
        'DisplayValue': 'Info',
        'ReturnValue': 'Info',
    });
    levels.push({
        'DisplayValue': 'Debug',
        'ReturnValue': 'Debug',
    });
    levels.push({
        'DisplayValue': 'Trace',
        'ReturnValue': 'Trace',
    });
    return levels;
}

/***/ }),

/***/ "./build.definitions/SubConApp/Rules/Logging/SetTraceCategories.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/SubConApp/Rules/Logging/SetTraceCategories.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetTraceCategories)
/* harmony export */ });
function SetTraceCategories(clientAPI) {
    var logger = clientAPI.getLogger();
    const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
    const fcsection = sectionedTable.getSection('FormCellSection0');
    const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
    const odataTrace = fcsection.getControl('odataTrace');

    try {
        if (traceCategory.getValue()) {
            var values = traceCategory.getValue();
            var categories = [];

            if (values && values.length) {
                categories = values.map((value) => {
                    return 'mdk.trace.' + value.ReturnValue;
                });
            }
            clientAPI.setDebugSettings(odataTrace.getValue(), true, categories);
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/SubConApp/Rules/Logging/SetUserLogLevel.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/SubConApp/Rules/Logging/SetUserLogLevel.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetUserLogLevel)
/* harmony export */ });
function SetUserLogLevel(clientAPI) {
    try {
        if (clientAPI.getValue() && clientAPI.getValue()[0]) {
            var logger = clientAPI.getLogger();
            var listPickerValue = clientAPI.getValue()[0].ReturnValue;
            if (listPickerValue) {
                switch (listPickerValue) {
                    case 'Debug':
                        logger.setLevel('Debug');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Error':
                        logger.setLevel('Error');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Warn':
                        logger.setLevel('Warn');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Info':
                        logger.setLevel('Info');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Trace':
                        logger.setLevel('Trace');
                        ShowTraceOptions(clientAPI, true);
                        break;
                    default:
                        // eslint-disable-next-line no-console
                        console.log(`unrecognized key ${listPickerValue}`);
                }
                return listPickerValue;
            }
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

function ShowTraceOptions(clientAPI, tracingEnabled) {
    let categories = clientAPI.getPageProxy().getControl('SectionedTable').getControl('TracingCategoriesListPicker');
    let odataTrace = clientAPI.getPageProxy().getControl('SectionedTable').getControl('odataTrace');

    categories.setVisible(tracingEnabled);
    odataTrace.setVisible(tracingEnabled);
}

/***/ }),

/***/ "./build.definitions/SubConApp/Rules/Logging/ToggleLogging.js":
/*!********************************************************************!*\
  !*** ./build.definitions/SubConApp/Rules/Logging/ToggleLogging.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToggleLogging)
/* harmony export */ });
function ToggleLogging(clientAPI) {
    try {
        var logger = clientAPI.getLogger();
        const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        let switchValue = enableLogSwitch.getValue();
        if (switchValue) {
            logger.on();
            logLevelListPicker.setVisible(true);
            logLevelListPicker.setEditable(true);
            logLevelListPicker.redraw();
        } else {
            logger.off();
            logLevelListPicker.setEditable(false);
            logLevelListPicker.setVisible(false);
            logLevelListPicker.redraw();
        }
        return switchValue;
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/SubConApp/Rules/Logging/TraceCategories.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/SubConApp/Rules/Logging/TraceCategories.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TraceCategories)
/* harmony export */ });
function TraceCategories(clientAPI) {
    var categories = ['action', 'api', 'app', 'binding', 'branding',
        'core', 'i18n', 'lcms', 'logging', 'odata', 'onboarding', 'profiling', 'push',
        'restservice', 'settings', 'targetpath', 'ui'
    ];

    var values = [];
    categories.forEach((category) => {
        values.push({
            'DisplayValue': category,
            'ReturnValue': category,
        });
    });

    return values;
}

/***/ }),

/***/ "./build.definitions/SubConApp/Rules/Logging/UserLogSetting.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/SubConApp/Rules/Logging/UserLogSetting.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserLogSetting)
/* harmony export */ });
function UserLogSetting(clientAPI) {

    try {
        var logger = clientAPI.getLogger();

        const sectionedTable = clientAPI.getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
        const odataTrace = fcsection.getControl('odataTrace');


        //Persist the user logging preferences
        if (logger) {
            console.log("in logger state");
            if (logger.isTurnedOn()) {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(true);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(true);
                }
            } else {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(false);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(false);
                }
            }
            var logLevel = logger.getLevel();
            if (logLevel) {
                if (logLevelListPicker) {
                    logLevelListPicker.setValue([logLevel]);
                }
            }
            if (logLevel === 'Trace') {
                traceCategory.setVisible(true);
                odataTrace.setVisible(true);
            }

            //Upon selecting a value in the List picker and clicking the back button 
            //will enable the onload page rule. This will set the selected value
            //in the control
            if (logLevelListPicker.getValue()[0]) {
                var returnValue = logLevelListPicker.getValue()[0].ReturnValue;
                if (returnValue) {
                    logLevelListPicker.setValue([returnValue]);
                    logger.setLevel(returnValue);
                }
            }
        }
    } catch (exception) {
        // eslint-disable-next-line no-console
        console.log(String(exception), 'Error User Logger could not be set');
    }
}

/***/ }),

/***/ "./build.definitions/SubConApp/Rules/Service/Initialize.js":
/*!*****************************************************************!*\
  !*** ./build.definitions/SubConApp/Rules/Service/Initialize.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Initialize)
/* harmony export */ });
function Initialize(context) {

    // Perform pre data initialization task

    // Initialize all your Data sources
    let _SubCon = context.executeAction('/SubConApp/Actions/SubCon/Service/InitializeOnline.action');

    //You can add more service initialize actions here

    return Promise.all([_SubCon]).then(() => {
        // After Initializing the DB connections

        // Display successful initialization  message to the user
        return context.executeAction({

            "Name": "/SubConApp/Actions/GenericToastMessage.action",
            "Properties": {
                "Message": "Application Services Initialized",
                "Animated": true,
                "Duration": 1,
                "IsIconHidden": true,
                "NumberOfLines": 1
            }
        });
    }).catch(() => {
        return false;
    });
}

/***/ }),

/***/ "./build.definitions/SubConApp/Rules/filterCustomer.js":
/*!*************************************************************!*\
  !*** ./build.definitions/SubConApp/Rules/filterCustomer.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ filterCustomer)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function filterCustomer(clientAPI) {
    let currentUser = clientAPI.evaluateTargetPath("#Application/#AppData/UserId");
    let entity = `Z_SUBC_CUST_C?$filter=email eq '${currentUser}'`;
    return entity;
}


/***/ }),

/***/ "./build.definitions/SubConApp/Rules/getMaterialCode.js":
/*!**************************************************************!*\
  !*** ./build.definitions/SubConApp/Rules/getMaterialCode.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getMaterialCode)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function getMaterialCode(clientAPI) {

    let data = clientAPI.evaluateTargetPath('#Control:FCCode/#Value');
    alert(data);
    //return data;
}




/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
	let subconapp_actions_addmaterialtocart_action = __webpack_require__(/*! ./SubConApp/Actions/addMaterialToCart.action */ "./build.definitions/SubConApp/Actions/addMaterialToCart.action")
	let subconapp_actions_addtocart_action = __webpack_require__(/*! ./SubConApp/Actions/AddToCart.action */ "./build.definitions/SubConApp/Actions/AddToCart.action")
	let subconapp_actions_application_appupdate_action = __webpack_require__(/*! ./SubConApp/Actions/Application/AppUpdate.action */ "./build.definitions/SubConApp/Actions/Application/AppUpdate.action")
	let subconapp_actions_application_appupdatefailuremessage_action = __webpack_require__(/*! ./SubConApp/Actions/Application/AppUpdateFailureMessage.action */ "./build.definitions/SubConApp/Actions/Application/AppUpdateFailureMessage.action")
	let subconapp_actions_application_appupdateprogressbanner_action = __webpack_require__(/*! ./SubConApp/Actions/Application/AppUpdateProgressBanner.action */ "./build.definitions/SubConApp/Actions/Application/AppUpdateProgressBanner.action")
	let subconapp_actions_application_appupdatesuccessmessage_action = __webpack_require__(/*! ./SubConApp/Actions/Application/AppUpdateSuccessMessage.action */ "./build.definitions/SubConApp/Actions/Application/AppUpdateSuccessMessage.action")
	let subconapp_actions_application_logout_action = __webpack_require__(/*! ./SubConApp/Actions/Application/Logout.action */ "./build.definitions/SubConApp/Actions/Application/Logout.action")
	let subconapp_actions_application_navtoabout_action = __webpack_require__(/*! ./SubConApp/Actions/Application/NavToAbout.action */ "./build.definitions/SubConApp/Actions/Application/NavToAbout.action")
	let subconapp_actions_application_navtoactivitylog_action = __webpack_require__(/*! ./SubConApp/Actions/Application/NavToActivityLog.action */ "./build.definitions/SubConApp/Actions/Application/NavToActivityLog.action")
	let subconapp_actions_application_navtosupport_action = __webpack_require__(/*! ./SubConApp/Actions/Application/NavToSupport.action */ "./build.definitions/SubConApp/Actions/Application/NavToSupport.action")
	let subconapp_actions_application_onwillupdate_action = __webpack_require__(/*! ./SubConApp/Actions/Application/OnWillUpdate.action */ "./build.definitions/SubConApp/Actions/Application/OnWillUpdate.action")
	let subconapp_actions_application_reset_action = __webpack_require__(/*! ./SubConApp/Actions/Application/Reset.action */ "./build.definitions/SubConApp/Actions/Application/Reset.action")
	let subconapp_actions_application_resetmessage_action = __webpack_require__(/*! ./SubConApp/Actions/Application/ResetMessage.action */ "./build.definitions/SubConApp/Actions/Application/ResetMessage.action")
	let subconapp_actions_application_usermenupopover_action = __webpack_require__(/*! ./SubConApp/Actions/Application/UserMenuPopover.action */ "./build.definitions/SubConApp/Actions/Application/UserMenuPopover.action")
	let subconapp_actions_clearcart_action = __webpack_require__(/*! ./SubConApp/Actions/clearCart.action */ "./build.definitions/SubConApp/Actions/clearCart.action")
	let subconapp_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./SubConApp/Actions/CloseModalPage_Cancel.action */ "./build.definitions/SubConApp/Actions/CloseModalPage_Cancel.action")
	let subconapp_actions_closemodalpage_complete_action = __webpack_require__(/*! ./SubConApp/Actions/CloseModalPage_Complete.action */ "./build.definitions/SubConApp/Actions/CloseModalPage_Complete.action")
	let subconapp_actions_closepage_action = __webpack_require__(/*! ./SubConApp/Actions/ClosePage.action */ "./build.definitions/SubConApp/Actions/ClosePage.action")
	let subconapp_actions_genericbannermessage_action = __webpack_require__(/*! ./SubConApp/Actions/GenericBannerMessage.action */ "./build.definitions/SubConApp/Actions/GenericBannerMessage.action")
	let subconapp_actions_genericmessagebox_action = __webpack_require__(/*! ./SubConApp/Actions/GenericMessageBox.action */ "./build.definitions/SubConApp/Actions/GenericMessageBox.action")
	let subconapp_actions_genericnavigation_action = __webpack_require__(/*! ./SubConApp/Actions/GenericNavigation.action */ "./build.definitions/SubConApp/Actions/GenericNavigation.action")
	let subconapp_actions_generictoastmessage_action = __webpack_require__(/*! ./SubConApp/Actions/GenericToastMessage.action */ "./build.definitions/SubConApp/Actions/GenericToastMessage.action")
	let subconapp_actions_getsubcontractordetails_action = __webpack_require__(/*! ./SubConApp/Actions/getSubcontractorDetails.action */ "./build.definitions/SubConApp/Actions/getSubcontractorDetails.action")
	let subconapp_actions_getworkflowstatus_action = __webpack_require__(/*! ./SubConApp/Actions/getWorkflowStatus.action */ "./build.definitions/SubConApp/Actions/getWorkflowStatus.action")
	let subconapp_actions_logging_loguploadfailure_action = __webpack_require__(/*! ./SubConApp/Actions/Logging/LogUploadFailure.action */ "./build.definitions/SubConApp/Actions/Logging/LogUploadFailure.action")
	let subconapp_actions_logging_loguploadsuccessful_action = __webpack_require__(/*! ./SubConApp/Actions/Logging/LogUploadSuccessful.action */ "./build.definitions/SubConApp/Actions/Logging/LogUploadSuccessful.action")
	let subconapp_actions_logging_uploadlog_action = __webpack_require__(/*! ./SubConApp/Actions/Logging/UploadLog.action */ "./build.definitions/SubConApp/Actions/Logging/UploadLog.action")
	let subconapp_actions_logging_uploadlogprogress_action = __webpack_require__(/*! ./SubConApp/Actions/Logging/UploadLogProgress.action */ "./build.definitions/SubConApp/Actions/Logging/UploadLogProgress.action")
	let subconapp_actions_navtochoosedetails_action = __webpack_require__(/*! ./SubConApp/Actions/NavToChooseDetails.action */ "./build.definitions/SubConApp/Actions/NavToChooseDetails.action")
	let subconapp_actions_navtodetailpage_action = __webpack_require__(/*! ./SubConApp/Actions/NavToDetailPage.action */ "./build.definitions/SubConApp/Actions/NavToDetailPage.action")
	let subconapp_actions_navtohome_action = __webpack_require__(/*! ./SubConApp/Actions/NavToHome.action */ "./build.definitions/SubConApp/Actions/NavToHome.action")
	let subconapp_actions_navtoitems_action = __webpack_require__(/*! ./SubConApp/Actions/navToItems.action */ "./build.definitions/SubConApp/Actions/navToItems.action")
	let subconapp_actions_navtomat_action = __webpack_require__(/*! ./SubConApp/Actions/NavToMat.action */ "./build.definitions/SubConApp/Actions/NavToMat.action")
	let subconapp_actions_navtomaterial_action = __webpack_require__(/*! ./SubConApp/Actions/NavToMaterial.action */ "./build.definitions/SubConApp/Actions/NavToMaterial.action")
	let subconapp_actions_navtomaterialpage_action = __webpack_require__(/*! ./SubConApp/Actions/NavToMaterialPage.action */ "./build.definitions/SubConApp/Actions/NavToMaterialPage.action")
	let subconapp_actions_navtomrf_action = __webpack_require__(/*! ./SubConApp/Actions/NavToMRF.action */ "./build.definitions/SubConApp/Actions/NavToMRF.action")
	let subconapp_actions_navtoorderitems_action = __webpack_require__(/*! ./SubConApp/Actions/NavToOrderItems.action */ "./build.definitions/SubConApp/Actions/NavToOrderItems.action")
	let subconapp_actions_navtosubcon_action = __webpack_require__(/*! ./SubConApp/Actions/NavToSubCon.action */ "./build.definitions/SubConApp/Actions/NavToSubCon.action")
	let subconapp_actions_navtosubcontractor_action = __webpack_require__(/*! ./SubConApp/Actions/NavToSubcontractor.action */ "./build.definitions/SubConApp/Actions/NavToSubcontractor.action")
	let subconapp_actions_ordererrormsg_action = __webpack_require__(/*! ./SubConApp/Actions/OrderErrorMsg.action */ "./build.definitions/SubConApp/Actions/OrderErrorMsg.action")
	let subconapp_actions_orderplaced_action = __webpack_require__(/*! ./SubConApp/Actions/OrderPlaced.action */ "./build.definitions/SubConApp/Actions/OrderPlaced.action")
	let subconapp_actions_placeorder_action = __webpack_require__(/*! ./SubConApp/Actions/placeOrder.action */ "./build.definitions/SubConApp/Actions/placeOrder.action")
	let subconapp_actions_requisitionerrormsg_action = __webpack_require__(/*! ./SubConApp/Actions/RequisitionErrorMsg.action */ "./build.definitions/SubConApp/Actions/RequisitionErrorMsg.action")
	let subconapp_actions_setsubcondetails_action = __webpack_require__(/*! ./SubConApp/Actions/setSubconDetails.action */ "./build.definitions/SubConApp/Actions/setSubconDetails.action")
	let subconapp_actions_subcon_service_initializeonline_action = __webpack_require__(/*! ./SubConApp/Actions/SubCon/Service/InitializeOnline.action */ "./build.definitions/SubConApp/Actions/SubCon/Service/InitializeOnline.action")
	let subconapp_actions_subcon_service_initializeonlinefailuremessage_action = __webpack_require__(/*! ./SubConApp/Actions/SubCon/Service/InitializeOnlineFailureMessage.action */ "./build.definitions/SubConApp/Actions/SubCon/Service/InitializeOnlineFailureMessage.action")
	let subconapp_actions_subcondetailsfailed_action = __webpack_require__(/*! ./SubConApp/Actions/subconDetailsFailed.action */ "./build.definitions/SubConApp/Actions/subconDetailsFailed.action")
	let subconapp_actions_table_action = __webpack_require__(/*! ./SubConApp/Actions/table.action */ "./build.definitions/SubConApp/Actions/table.action")
	let subconapp_actions_tocart_action = __webpack_require__(/*! ./SubConApp/Actions/ToCart.action */ "./build.definitions/SubConApp/Actions/ToCart.action")
	let subconapp_actions_tomrf_action = __webpack_require__(/*! ./SubConApp/Actions/tomrf.action */ "./build.definitions/SubConApp/Actions/tomrf.action")
	let subconapp_actions_toorders_action = __webpack_require__(/*! ./SubConApp/Actions/ToOrders.action */ "./build.definitions/SubConApp/Actions/ToOrders.action")
	let subconapp_actions_toplant_action = __webpack_require__(/*! ./SubConApp/Actions/toplant.action */ "./build.definitions/SubConApp/Actions/toplant.action")
	let subconapp_actions_toprev_action = __webpack_require__(/*! ./SubConApp/Actions/toPrev.action */ "./build.definitions/SubConApp/Actions/toPrev.action")
	let subconapp_actions_toprevorders_action = __webpack_require__(/*! ./SubConApp/Actions/toPrevOrders.action */ "./build.definitions/SubConApp/Actions/toPrevOrders.action")
	let subconapp_actions_tosubcon2_action = __webpack_require__(/*! ./SubConApp/Actions/toSubCon2.action */ "./build.definitions/SubConApp/Actions/toSubCon2.action")
	let subconapp_actions_totest_action = __webpack_require__(/*! ./SubConApp/Actions/toTest.action */ "./build.definitions/SubConApp/Actions/toTest.action")
	let subconapp_actions_worflowstastusupdatesucess_action = __webpack_require__(/*! ./SubConApp/Actions/WorflowstastusUpdateSucess.action */ "./build.definitions/SubConApp/Actions/WorflowstastusUpdateSucess.action")
	let subconapp_actions_worflowstatusupdatedfailedmsg_action = __webpack_require__(/*! ./SubConApp/Actions/worflowStatusUpdatedFailedMsg.action */ "./build.definitions/SubConApp/Actions/worflowStatusUpdatedFailedMsg.action")
	let subconapp_globals_application_appdefinition_version_global = __webpack_require__(/*! ./SubConApp/Globals/Application/AppDefinition_Version.global */ "./build.definitions/SubConApp/Globals/Application/AppDefinition_Version.global")
	let subconapp_globals_application_applicationname_global = __webpack_require__(/*! ./SubConApp/Globals/Application/ApplicationName.global */ "./build.definitions/SubConApp/Globals/Application/ApplicationName.global")
	let subconapp_globals_application_supportemail_global = __webpack_require__(/*! ./SubConApp/Globals/Application/SupportEmail.global */ "./build.definitions/SubConApp/Globals/Application/SupportEmail.global")
	let subconapp_globals_application_supportphone_global = __webpack_require__(/*! ./SubConApp/Globals/Application/SupportPhone.global */ "./build.definitions/SubConApp/Globals/Application/SupportPhone.global")
	let subconapp_i18n_i18n_properties = __webpack_require__(/*! ./SubConApp/i18n/i18n.properties */ "./build.definitions/SubConApp/i18n/i18n.properties")
	let subconapp_jsconfig_json = __webpack_require__(/*! ./SubConApp/jsconfig.json */ "./build.definitions/SubConApp/jsconfig.json")
	let subconapp_pages_application_about_page = __webpack_require__(/*! ./SubConApp/Pages/Application/About.page */ "./build.definitions/SubConApp/Pages/Application/About.page")
	let subconapp_pages_application_support_page = __webpack_require__(/*! ./SubConApp/Pages/Application/Support.page */ "./build.definitions/SubConApp/Pages/Application/Support.page")
	let subconapp_pages_application_useractivitylog_page = __webpack_require__(/*! ./SubConApp/Pages/Application/UserActivityLog.page */ "./build.definitions/SubConApp/Pages/Application/UserActivityLog.page")
	let subconapp_pages_cartitems_page = __webpack_require__(/*! ./SubConApp/Pages/cartItems.page */ "./build.definitions/SubConApp/Pages/cartItems.page")
	let subconapp_pages_cartpage_page = __webpack_require__(/*! ./SubConApp/Pages/CartPage.page */ "./build.definitions/SubConApp/Pages/CartPage.page")
	let subconapp_pages_choosedetails_page = __webpack_require__(/*! ./SubConApp/Pages/ChooseDetails.page */ "./build.definitions/SubConApp/Pages/ChooseDetails.page")
	let subconapp_pages_datatable_page = __webpack_require__(/*! ./SubConApp/Pages/DataTable.page */ "./build.definitions/SubConApp/Pages/DataTable.page")
	let subconapp_pages_items_page = __webpack_require__(/*! ./SubConApp/Pages/Items.page */ "./build.definitions/SubConApp/Pages/Items.page")
	let subconapp_pages_main_page = __webpack_require__(/*! ./SubConApp/Pages/Main.page */ "./build.definitions/SubConApp/Pages/Main.page")
	let subconapp_pages_mat_page = __webpack_require__(/*! ./SubConApp/Pages/Mat.page */ "./build.definitions/SubConApp/Pages/Mat.page")
	let subconapp_pages_material_page = __webpack_require__(/*! ./SubConApp/Pages/Material.page */ "./build.definitions/SubConApp/Pages/Material.page")
	let subconapp_pages_materialdetails_page = __webpack_require__(/*! ./SubConApp/Pages/MaterialDetails.page */ "./build.definitions/SubConApp/Pages/MaterialDetails.page")
	let subconapp_pages_materialrequisitionform_page = __webpack_require__(/*! ./SubConApp/Pages/MaterialRequisitionForm.page */ "./build.definitions/SubConApp/Pages/MaterialRequisitionForm.page")
	let subconapp_pages_mrf_page = __webpack_require__(/*! ./SubConApp/Pages/MRF.page */ "./build.definitions/SubConApp/Pages/MRF.page")
	let subconapp_pages_orderitems_page = __webpack_require__(/*! ./SubConApp/Pages/OrderItems.page */ "./build.definitions/SubConApp/Pages/OrderItems.page")
	let subconapp_pages_orders_page = __webpack_require__(/*! ./SubConApp/Pages/Orders.page */ "./build.definitions/SubConApp/Pages/Orders.page")
	let subconapp_pages_plant_page = __webpack_require__(/*! ./SubConApp/Pages/Plant.page */ "./build.definitions/SubConApp/Pages/Plant.page")
	let subconapp_pages_previousorderdetails_page = __webpack_require__(/*! ./SubConApp/Pages/PreviousOrderDetails.page */ "./build.definitions/SubConApp/Pages/PreviousOrderDetails.page")
	let subconapp_pages_prevorder_page = __webpack_require__(/*! ./SubConApp/Pages/prevOrder.page */ "./build.definitions/SubConApp/Pages/prevOrder.page")
	let subconapp_pages_subcon_page = __webpack_require__(/*! ./SubConApp/Pages/SubCon.page */ "./build.definitions/SubConApp/Pages/SubCon.page")
	let subconapp_pages_subcondetails_page = __webpack_require__(/*! ./SubConApp/Pages/SubConDetails.page */ "./build.definitions/SubConApp/Pages/SubConDetails.page")
	let subconapp_pages_subcontractor_page = __webpack_require__(/*! ./SubConApp/Pages/subcontractor.page */ "./build.definitions/SubConApp/Pages/subcontractor.page")
	let subconapp_pages_test_page = __webpack_require__(/*! ./SubConApp/Pages/test.page */ "./build.definitions/SubConApp/Pages/test.page")
	let subconapp_rules_application_appupdatefailure_js = __webpack_require__(/*! ./SubConApp/Rules/Application/AppUpdateFailure.js */ "./build.definitions/SubConApp/Rules/Application/AppUpdateFailure.js")
	let subconapp_rules_application_appupdatesuccess_js = __webpack_require__(/*! ./SubConApp/Rules/Application/AppUpdateSuccess.js */ "./build.definitions/SubConApp/Rules/Application/AppUpdateSuccess.js")
	let subconapp_rules_application_clientismultiusermode_js = __webpack_require__(/*! ./SubConApp/Rules/Application/ClientIsMultiUserMode.js */ "./build.definitions/SubConApp/Rules/Application/ClientIsMultiUserMode.js")
	let subconapp_rules_application_getclientsupportversions_js = __webpack_require__(/*! ./SubConApp/Rules/Application/GetClientSupportVersions.js */ "./build.definitions/SubConApp/Rules/Application/GetClientSupportVersions.js")
	let subconapp_rules_application_getclientversion_js = __webpack_require__(/*! ./SubConApp/Rules/Application/GetClientVersion.js */ "./build.definitions/SubConApp/Rules/Application/GetClientVersion.js")
	let subconapp_rules_application_onwillupdate_js = __webpack_require__(/*! ./SubConApp/Rules/Application/OnWillUpdate.js */ "./build.definitions/SubConApp/Rules/Application/OnWillUpdate.js")
	let subconapp_rules_application_resetappsettingsandlogout_js = __webpack_require__(/*! ./SubConApp/Rules/Application/ResetAppSettingsAndLogout.js */ "./build.definitions/SubConApp/Rules/Application/ResetAppSettingsAndLogout.js")
	let subconapp_rules_filtercustomer_js = __webpack_require__(/*! ./SubConApp/Rules/filterCustomer.js */ "./build.definitions/SubConApp/Rules/filterCustomer.js")
	let subconapp_rules_filterdeptbyplant_js = __webpack_require__(/*! ./SubConApp/Rules/FilterDeptByPlant.js */ "./build.definitions/SubConApp/Rules/FilterDeptByPlant.js")
	let subconapp_rules_getcustomer_js = __webpack_require__(/*! ./SubConApp/Rules/GetCustomer.js */ "./build.definitions/SubConApp/Rules/GetCustomer.js")
	let subconapp_rules_getmaterialcode_js = __webpack_require__(/*! ./SubConApp/Rules/getMaterialCode.js */ "./build.definitions/SubConApp/Rules/getMaterialCode.js")
	let subconapp_rules_logging_loglevels_js = __webpack_require__(/*! ./SubConApp/Rules/Logging/LogLevels.js */ "./build.definitions/SubConApp/Rules/Logging/LogLevels.js")
	let subconapp_rules_logging_settracecategories_js = __webpack_require__(/*! ./SubConApp/Rules/Logging/SetTraceCategories.js */ "./build.definitions/SubConApp/Rules/Logging/SetTraceCategories.js")
	let subconapp_rules_logging_setuserloglevel_js = __webpack_require__(/*! ./SubConApp/Rules/Logging/SetUserLogLevel.js */ "./build.definitions/SubConApp/Rules/Logging/SetUserLogLevel.js")
	let subconapp_rules_logging_togglelogging_js = __webpack_require__(/*! ./SubConApp/Rules/Logging/ToggleLogging.js */ "./build.definitions/SubConApp/Rules/Logging/ToggleLogging.js")
	let subconapp_rules_logging_tracecategories_js = __webpack_require__(/*! ./SubConApp/Rules/Logging/TraceCategories.js */ "./build.definitions/SubConApp/Rules/Logging/TraceCategories.js")
	let subconapp_rules_logging_userlogsetting_js = __webpack_require__(/*! ./SubConApp/Rules/Logging/UserLogSetting.js */ "./build.definitions/SubConApp/Rules/Logging/UserLogSetting.js")
	let subconapp_rules_service_initialize_js = __webpack_require__(/*! ./SubConApp/Rules/Service/Initialize.js */ "./build.definitions/SubConApp/Rules/Service/Initialize.js")
	let subconapp_services_subcon_service = __webpack_require__(/*! ./SubConApp/Services/SubCon.service */ "./build.definitions/SubConApp/Services/SubCon.service")
	let subconapp_styles_styles_css = __webpack_require__(/*! ./SubConApp/Styles/Styles.css */ "./build.definitions/SubConApp/Styles/Styles.css")
	let subconapp_styles_styles_json = __webpack_require__(/*! ./SubConApp/Styles/Styles.json */ "./build.definitions/SubConApp/Styles/Styles.json")
	let subconapp_styles_styles_less = __webpack_require__(/*! ./SubConApp/Styles/Styles.less */ "./build.definitions/SubConApp/Styles/Styles.less")
	let subconapp_styles_styles_nss = __webpack_require__(/*! ./SubConApp/Styles/Styles.nss */ "./build.definitions/SubConApp/Styles/Styles.nss")
	let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
	let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")
	
	module.exports = {
		application_app : application_app,
		subconapp_actions_addmaterialtocart_action : subconapp_actions_addmaterialtocart_action,
		subconapp_actions_addtocart_action : subconapp_actions_addtocart_action,
		subconapp_actions_application_appupdate_action : subconapp_actions_application_appupdate_action,
		subconapp_actions_application_appupdatefailuremessage_action : subconapp_actions_application_appupdatefailuremessage_action,
		subconapp_actions_application_appupdateprogressbanner_action : subconapp_actions_application_appupdateprogressbanner_action,
		subconapp_actions_application_appupdatesuccessmessage_action : subconapp_actions_application_appupdatesuccessmessage_action,
		subconapp_actions_application_logout_action : subconapp_actions_application_logout_action,
		subconapp_actions_application_navtoabout_action : subconapp_actions_application_navtoabout_action,
		subconapp_actions_application_navtoactivitylog_action : subconapp_actions_application_navtoactivitylog_action,
		subconapp_actions_application_navtosupport_action : subconapp_actions_application_navtosupport_action,
		subconapp_actions_application_onwillupdate_action : subconapp_actions_application_onwillupdate_action,
		subconapp_actions_application_reset_action : subconapp_actions_application_reset_action,
		subconapp_actions_application_resetmessage_action : subconapp_actions_application_resetmessage_action,
		subconapp_actions_application_usermenupopover_action : subconapp_actions_application_usermenupopover_action,
		subconapp_actions_clearcart_action : subconapp_actions_clearcart_action,
		subconapp_actions_closemodalpage_cancel_action : subconapp_actions_closemodalpage_cancel_action,
		subconapp_actions_closemodalpage_complete_action : subconapp_actions_closemodalpage_complete_action,
		subconapp_actions_closepage_action : subconapp_actions_closepage_action,
		subconapp_actions_genericbannermessage_action : subconapp_actions_genericbannermessage_action,
		subconapp_actions_genericmessagebox_action : subconapp_actions_genericmessagebox_action,
		subconapp_actions_genericnavigation_action : subconapp_actions_genericnavigation_action,
		subconapp_actions_generictoastmessage_action : subconapp_actions_generictoastmessage_action,
		subconapp_actions_getsubcontractordetails_action : subconapp_actions_getsubcontractordetails_action,
		subconapp_actions_getworkflowstatus_action : subconapp_actions_getworkflowstatus_action,
		subconapp_actions_logging_loguploadfailure_action : subconapp_actions_logging_loguploadfailure_action,
		subconapp_actions_logging_loguploadsuccessful_action : subconapp_actions_logging_loguploadsuccessful_action,
		subconapp_actions_logging_uploadlog_action : subconapp_actions_logging_uploadlog_action,
		subconapp_actions_logging_uploadlogprogress_action : subconapp_actions_logging_uploadlogprogress_action,
		subconapp_actions_navtochoosedetails_action : subconapp_actions_navtochoosedetails_action,
		subconapp_actions_navtodetailpage_action : subconapp_actions_navtodetailpage_action,
		subconapp_actions_navtohome_action : subconapp_actions_navtohome_action,
		subconapp_actions_navtoitems_action : subconapp_actions_navtoitems_action,
		subconapp_actions_navtomat_action : subconapp_actions_navtomat_action,
		subconapp_actions_navtomaterial_action : subconapp_actions_navtomaterial_action,
		subconapp_actions_navtomaterialpage_action : subconapp_actions_navtomaterialpage_action,
		subconapp_actions_navtomrf_action : subconapp_actions_navtomrf_action,
		subconapp_actions_navtoorderitems_action : subconapp_actions_navtoorderitems_action,
		subconapp_actions_navtosubcon_action : subconapp_actions_navtosubcon_action,
		subconapp_actions_navtosubcontractor_action : subconapp_actions_navtosubcontractor_action,
		subconapp_actions_ordererrormsg_action : subconapp_actions_ordererrormsg_action,
		subconapp_actions_orderplaced_action : subconapp_actions_orderplaced_action,
		subconapp_actions_placeorder_action : subconapp_actions_placeorder_action,
		subconapp_actions_requisitionerrormsg_action : subconapp_actions_requisitionerrormsg_action,
		subconapp_actions_setsubcondetails_action : subconapp_actions_setsubcondetails_action,
		subconapp_actions_subcon_service_initializeonline_action : subconapp_actions_subcon_service_initializeonline_action,
		subconapp_actions_subcon_service_initializeonlinefailuremessage_action : subconapp_actions_subcon_service_initializeonlinefailuremessage_action,
		subconapp_actions_subcondetailsfailed_action : subconapp_actions_subcondetailsfailed_action,
		subconapp_actions_table_action : subconapp_actions_table_action,
		subconapp_actions_tocart_action : subconapp_actions_tocart_action,
		subconapp_actions_tomrf_action : subconapp_actions_tomrf_action,
		subconapp_actions_toorders_action : subconapp_actions_toorders_action,
		subconapp_actions_toplant_action : subconapp_actions_toplant_action,
		subconapp_actions_toprev_action : subconapp_actions_toprev_action,
		subconapp_actions_toprevorders_action : subconapp_actions_toprevorders_action,
		subconapp_actions_tosubcon2_action : subconapp_actions_tosubcon2_action,
		subconapp_actions_totest_action : subconapp_actions_totest_action,
		subconapp_actions_worflowstastusupdatesucess_action : subconapp_actions_worflowstastusupdatesucess_action,
		subconapp_actions_worflowstatusupdatedfailedmsg_action : subconapp_actions_worflowstatusupdatedfailedmsg_action,
		subconapp_globals_application_appdefinition_version_global : subconapp_globals_application_appdefinition_version_global,
		subconapp_globals_application_applicationname_global : subconapp_globals_application_applicationname_global,
		subconapp_globals_application_supportemail_global : subconapp_globals_application_supportemail_global,
		subconapp_globals_application_supportphone_global : subconapp_globals_application_supportphone_global,
		subconapp_i18n_i18n_properties : subconapp_i18n_i18n_properties,
		subconapp_jsconfig_json : subconapp_jsconfig_json,
		subconapp_pages_application_about_page : subconapp_pages_application_about_page,
		subconapp_pages_application_support_page : subconapp_pages_application_support_page,
		subconapp_pages_application_useractivitylog_page : subconapp_pages_application_useractivitylog_page,
		subconapp_pages_cartitems_page : subconapp_pages_cartitems_page,
		subconapp_pages_cartpage_page : subconapp_pages_cartpage_page,
		subconapp_pages_choosedetails_page : subconapp_pages_choosedetails_page,
		subconapp_pages_datatable_page : subconapp_pages_datatable_page,
		subconapp_pages_items_page : subconapp_pages_items_page,
		subconapp_pages_main_page : subconapp_pages_main_page,
		subconapp_pages_mat_page : subconapp_pages_mat_page,
		subconapp_pages_material_page : subconapp_pages_material_page,
		subconapp_pages_materialdetails_page : subconapp_pages_materialdetails_page,
		subconapp_pages_materialrequisitionform_page : subconapp_pages_materialrequisitionform_page,
		subconapp_pages_mrf_page : subconapp_pages_mrf_page,
		subconapp_pages_orderitems_page : subconapp_pages_orderitems_page,
		subconapp_pages_orders_page : subconapp_pages_orders_page,
		subconapp_pages_plant_page : subconapp_pages_plant_page,
		subconapp_pages_previousorderdetails_page : subconapp_pages_previousorderdetails_page,
		subconapp_pages_prevorder_page : subconapp_pages_prevorder_page,
		subconapp_pages_subcon_page : subconapp_pages_subcon_page,
		subconapp_pages_subcondetails_page : subconapp_pages_subcondetails_page,
		subconapp_pages_subcontractor_page : subconapp_pages_subcontractor_page,
		subconapp_pages_test_page : subconapp_pages_test_page,
		subconapp_rules_application_appupdatefailure_js : subconapp_rules_application_appupdatefailure_js,
		subconapp_rules_application_appupdatesuccess_js : subconapp_rules_application_appupdatesuccess_js,
		subconapp_rules_application_clientismultiusermode_js : subconapp_rules_application_clientismultiusermode_js,
		subconapp_rules_application_getclientsupportversions_js : subconapp_rules_application_getclientsupportversions_js,
		subconapp_rules_application_getclientversion_js : subconapp_rules_application_getclientversion_js,
		subconapp_rules_application_onwillupdate_js : subconapp_rules_application_onwillupdate_js,
		subconapp_rules_application_resetappsettingsandlogout_js : subconapp_rules_application_resetappsettingsandlogout_js,
		subconapp_rules_filtercustomer_js : subconapp_rules_filtercustomer_js,
		subconapp_rules_filterdeptbyplant_js : subconapp_rules_filterdeptbyplant_js,
		subconapp_rules_getcustomer_js : subconapp_rules_getcustomer_js,
		subconapp_rules_getmaterialcode_js : subconapp_rules_getmaterialcode_js,
		subconapp_rules_logging_loglevels_js : subconapp_rules_logging_loglevels_js,
		subconapp_rules_logging_settracecategories_js : subconapp_rules_logging_settracecategories_js,
		subconapp_rules_logging_setuserloglevel_js : subconapp_rules_logging_setuserloglevel_js,
		subconapp_rules_logging_togglelogging_js : subconapp_rules_logging_togglelogging_js,
		subconapp_rules_logging_tracecategories_js : subconapp_rules_logging_tracecategories_js,
		subconapp_rules_logging_userlogsetting_js : subconapp_rules_logging_userlogsetting_js,
		subconapp_rules_service_initialize_js : subconapp_rules_service_initialize_js,
		subconapp_services_subcon_service : subconapp_services_subcon_service,
		subconapp_styles_styles_css : subconapp_styles_styles_css,
		subconapp_styles_styles_json : subconapp_styles_styles_json,
		subconapp_styles_styles_less : subconapp_styles_styles_less,
		subconapp_styles_styles_nss : subconapp_styles_styles_nss,
		tsconfig_json : tsconfig_json,
		version_mdkbundlerversion : version_mdkbundlerversion
	}

/***/ }),

/***/ "./build.definitions/SubConApp/Styles/Styles.css":
/*!*******************************************************!*\
  !*** ./build.definitions/SubConApp/Styles/Styles.css ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
div.MDKPage

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
	`, "",{"version":3,"sources":["webpack://./build.definitions/SubConApp/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n\t"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/SubConApp/Styles/Styles.less":
/*!********************************************************!*\
  !*** ./build.definitions/SubConApp/Styles/Styles.less ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/`, "",{"version":3,"sources":["webpack://./build.definitions/SubConApp/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/SubConApp/Styles/Styles.nss":
/*!*******************************************************!*\
  !*** ./build.definitions/SubConApp/Styles/Styles.nss ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/sourceMaps.js":
/*!*********************************************************!*\
  !*** ../../../../css-loader/dist/runtime/sourceMaps.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/Application/About.page":
/*!******************************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/Application/About.page ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"KeyAndValues":[{"_Name":"KeyValue0","KeyName":"User ID","Value":"#Application/#AppData/UserId","Visible":true},{"Value":"#Application/#AppData/DeviceId","_Name":"KeyValue1","KeyName":"Device ID","Visible":true},{"Value":"/SubConApp/Globals/Application/ApplicationName.global","_Name":"KeyValue2","KeyName":"Application","Visible":true},{"Value":"/SubConApp/Globals/Application/AppDefinition_Version.global","_Name":"KeyValue3","KeyName":"Application Metadata Version","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}},{"KeyAndValues":[{"Value":"/SubConApp/Rules/Application/GetClientVersion.js","_Name":"KeyValue4","KeyName":"Client Version","Visible":"$(PLT,true,true,false)"},{"Value":"/SubConApp/Rules/Application/GetClientSupportVersions.js","_Name":"KeyValue5","KeyName":"Client Support Versions","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"About","Caption":"About","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/SubConApp/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/Application/Support.page":
/*!********************************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/Application/Support.page ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","_Name":"SectionContactCellTable1","EmptySection":{"FooterVisible":false},"ContactCells":[{"ContactCell":{"_Name":"ContactCellItem0","Headline":"Contact Support","ActivityItems":[{"ActivityType":"Phone","ActivityValue":"/SubConApp/Globals/Application/SupportPhone.global"},{"ActivityType":"Email","ActivityValue":"/SubConApp/Globals/Application/SupportEmail.global"},{"ActivityType":"Message","ActivityValue":"/SubConApp/Globals/Application/SupportPhone.global"}]}}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":false,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":"$(PLT,true,true,false)","EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"_Name":"SectionSimplePropertyCell0","KeyName":"Activity Log","AccessoryType":"DisclosureIndicator","Visible":"$(PLT,true,true,false)","OnPress":"/SubConApp/Actions/Application/NavToActivityLog.action"}}],"Layout":{"NumberOfColumns":1,"MinimumInteritemSpacing":66}}]}],"_Type":"Page","_Name":"Settings","Caption":"Settings","PrefersLargeCaption":false,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/SubConApp/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/Application/UserActivityLog.page":
/*!****************************************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/Application/UserActivityLog.page ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"EnableLogSwitch","IsVisible":true,"Separator":true,"Caption":"Enable Logging","OnValueChange":"/SubConApp/Rules/Logging/ToggleLogging.js","IsEditable":true},{"IsSearchEnabled":false,"_Type":"Control.Type.FormCell.ListPicker","_Name":"LogLevelListPicker","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Log Level","OnValueChange":"/SubConApp/Rules/Logging/SetUserLogLevel.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":true,"AllowDefaultValueIfOneItem":false,"IsEditable":false,"PickerItems":"/SubConApp/Rules/Logging/LogLevels.js"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"TracingCategoriesListPicker","IsVisible":false,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Tracing Categories","PickerPrompt":"Select Categories for Tracing","OnValueChange":"/SubConApp/Rules/Logging/SetTraceCategories.js","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":"/SubConApp/Rules/Logging/TraceCategories.js"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"odataTrace","IsVisible":false,"Separator":true,"Caption":"OData Tracing","OnValueChange":"/SubConApp/Rules/Logging/SetTraceCategories.js","IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection0"},{"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"Send","IsVisible":true,"Separator":true,"Title":"Send Activity Log","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/SubConApp/Actions/Logging/UploadLogProgress.action"}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection1"}]}],"_Type":"Page","_Name":"UserActivityLog","Caption":"Activity Log","PrefersLargeCaption":false,"OnLoaded":"/SubConApp/Rules/Logging/UserLogSetting.js"}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/CartPage.page":
/*!*********************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/CartPage.page ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"Sections":{"Header":{"DataTable":{"Items":[{"Text":"Project Code","NumberOfLines":1},{"Text":"Quantity","NumberOfLines":1},{"Text":"Material Code","NumberOfLines":1},{"Text":"MR number","NumberOfLines":1}],"Layout":{"ColumnWidth":[]}},"_Name":"SectionDataTableHeader1","AccessoryType":"None","UseTopPadding":true},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Row":{"Items":[{"Value":"p001","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[],"Value":"{projectCode}"}},{"Value":"{quantity}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{materialCode}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{ID}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}}],"Layout":{"ColumnWidth":[100,100,100,100]}},"_Type":"Section.Type.DataTable","Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"MaterialRequisitions"},"_Name":"SectionDataTable0","Visible":true,"EmptySection":{"FooterVisible":false},"EditMode":"Inline","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50}},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0"}],"_Type":"Page","_Name":"CartPage","Caption":"CartPage","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/ChooseDetails.page":
/*!**************************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/ChooseDetails.page ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":["{werks}"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FCSetPlant","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Plant","DataPaging":{"ShowLoadingIndicator":true,"PageSize":50},"PickerPrompt":"Please select one single item","OnValueChange":"/SubConApp/Rules/FilterDeptByPlant.js","IsSelectedSectionEnabled":true,"AllowDefaultValueIfOneItem":true,"IsEditable":true,"Search":{"Enabled":true},"PickerItems":{"Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"Z_SUBC_PLANT_C"},"ObjectCell":{"PreserveIconStackSpacing":true,"Selected":true,"Title":"{name1} {werks}","Visible":true},"ReturnValue":"{werks}"}},{"Value":["{pspid}"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FCSetProject","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Project Code","DataPaging":{"ShowLoadingIndicator":true,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":true,"AllowDefaultValueIfOneItem":true,"IsEditable":true,"Search":{"Enabled":true},"PickerItems":{"Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"Z_SUBC_PROJ_C"},"ObjectCell":{"PreserveIconStackSpacing":true,"Selected":true,"Title":"{post1} {pspid}","Visible":true},"ReturnValue":"{pspid}"}},{"Value":["{kostl}"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FCDept","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Department","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":true,"AllowDefaultValueIfOneItem":true,"IsEditable":true,"FilterProperty":"{plant_code}","Search":{"Enabled":true},"PickerItems":{"Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"Z_SUBC_DEPT_C","QueryOptions":"$filter=werks eq '{{#Control:FCSetPlant/#SelectedValue}}'"},"ObjectCell":{"PreserveIconStackSpacing":true,"Selected":true,"Title":"{kostl} {KTEXT}","Visible":true},"ReturnValue":"{kostl}"}}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"}]}],"_Type":"Page","_Name":"ChooseDetails","Caption":"Choose Details","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem1","Caption":"Item","SystemItem":"Cancel","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/SubConApp/Actions/CloseModalPage_Complete.action"},{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/SubConApp/Actions/setSubconDetails.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/DataTable.page":
/*!**********************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/DataTable.page ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Header":{"DataTable":{"Items":[{"Text":"MR No","NumberOfLines":1},{"Text":"Material Group","NumberOfLines":1},{"Text":"Material Code","NumberOfLines":1},{"Text":"Name","NumberOfLines":1},{"Text":"Quantity","NumberOfLines":1},{"Text":"UoM","NumberOfLines":1},{"Text":"WBS No","NumberOfLines":1}],"Layout":{"ColumnWidth":[]}},"_Name":"SectionDataTableHeader0","AccessoryType":"None","UseTopPadding":true},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Row":{"Items":[{"Value":"{ID}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{materialGroup}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{materialCode}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{materialName}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{quantity}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{uom}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{wbsNo}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}}],"Layout":{"ColumnWidth":[100,100,100,100,100,100,100,100]}},"_Type":"Section.Type.DataTable","Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"MaterialRequisitions"},"_Name":"SectionDataTable0","Visible":true,"EmptySection":{"FooterVisible":false},"EditMode":"None","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50}},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[{"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton0","Title":"Place Order","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"res://mdk_logo.png","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/SubConApp/Actions/placeOrder.action"},{"_Type":"ButtonTable.Type.Button","_Name":"SectionButton0","Title":"Browse Materials","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://search","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/SubConApp/Actions/NavToMaterialPage.action"},{"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton1","Title":"Previous Orders","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://my-sales-order","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/SubConApp/Actions/toPrevOrders.action"}]}]}],"_Type":"Page","_Name":"CartItems","Caption":"Cart","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Home","Icon":"sap-icon://home","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/SubConApp/Rules/GetCustomer.js"},{"_Name":"Clear Cart","Caption":"Item","Icon":"sap-icon://clear-all","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/SubConApp/Actions/clearCart.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/Items.page":
/*!******************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/Items.page ***!
  \******************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader0","ObjectHeader":{"Subhead":"Subhead","Description":"Order Id: {orderID_ID}","StatusText":"Status","SubstatusText":"Substatus","DetailImage":"res://mdk_logo.png","DetailImageIsCircular":false,"HeadlineText":"Headline","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading"},"Visible":true}],"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"}}],"_Type":"Page","_Name":"Items","Caption":"Items","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/MRF.page":
/*!****************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/MRF.page ***!
  \****************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Controls":[{"Value":["{code}"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker0","IsVisible":true,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Plants","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":{"Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"Plants"},"ObjectCell":{"PreserveIconStackSpacing":true,"Selected":true,"Title":"{code} {name}","Visible":true},"ReturnValue":"{code}"}},{"Value":["{code}"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker1","IsVisible":true,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Projects","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":{"Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"Projects"},"ObjectCell":{"PreserveIconStackSpacing":true,"Title":"{code} {description}","Visible":true},"ReturnValue":"{code}"}},{"Value":["{number}"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker2","IsVisible":true,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"WBS","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":{"Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"WBSElements"},"ObjectCell":{"PreserveIconStackSpacing":true,"Selected":true,"Title":"{number} {description}","Visible":true},"ReturnValue":"{number}"}}]}],"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"}}],"_Type":"Page","_Name":"MRF","Caption":"MRF","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/Main.page":
/*!*****************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/Main.page ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable1","Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[{"_Type":"ButtonTable.Type.Button","_Name":"SectionButton1","Title":"SubContractor App","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"res://mdk_logo.png","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/SubConApp/Rules/GetCustomer.js"}]}]}],"_Type":"Page","_Name":"Main","Caption":"Main","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"User Menu","Icon":"sap-icon://customer","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/SubConApp/Actions/Application/UserMenuPopover.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/Mat.page":
/*!****************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/Mat.page ***!
  \****************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ContactCell","Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"Materials","QueryOptions":"$top=1"},"_Name":"SectionContactCell1","Visible":true,"EmptySection":{"FooterVisible":false},"ContactCell":{"Visible":true,"ContextMenu":{"PerformFirstActionWithFullSwipe":true},"DetailImage":"res://contact.png","Headline":"{name}","Subheadline":"{code}","Description":"{code}"},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50}}]}],"_Type":"Page","_Name":"Mat","Caption":"Mat","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/Material.page":
/*!*********************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/Material.page ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ContactCell","Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"Z_SUBC_MATNR_C"},"_Name":"SectionContactCell1","Visible":true,"EmptySection":{"FooterVisible":false},"ContactCell":{"Visible":true,"ContextMenu":{"PerformFirstActionWithFullSwipe":true},"DetailImage":"sap-icon://product","Headline":"{maktx}","Subheadline":"{matnr}","Description":"{matkl}","OnPress":"/SubConApp/Actions/NavToDetailPage.action"},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"Search":{"Enabled":true}}]}],"_Type":"Page","_Name":"Material","Caption":"Materials","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem1","Caption":"Home","Icon":"sap-icon://home","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/SubConApp/Actions/NavToHome.action"},{"_Name":"ActionBarItem0","Caption":"Item","Icon":"sap-icon://cart","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/SubConApp/Actions/table.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/MaterialDetails.page":
/*!****************************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/MaterialDetails.page ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":"{maktx}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty0","IsVisible":true,"Separator":true,"Caption":"Material Name","PlaceHolder":"{maktx}","Enabled":true,"IsEditable":true},{"Value":"{matnr}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty2","IsVisible":true,"Separator":true,"Caption":"Material Number","PlaceHolder":"{matnr}","Enabled":true,"IsEditable":true},{"Value":"{matkl}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty1","IsVisible":true,"Separator":true,"Caption":"Material Group","PlaceHolder":"{matkl}","Enabled":true,"IsEditable":true},{"Value":"{meins}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty3","IsVisible":true,"Separator":true,"Caption":"UoM","PlaceHolder":"{meins}","Enabled":true,"IsEditable":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable1","Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[{"_Type":"ButtonTable.Type.Button","_Name":"SectionButton0","Title":"Request Material","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://request","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/SubConApp/Actions/NavToMRF.action"}]}]}],"_Type":"Page","_Name":"MaterialDetails","Caption":"Material Details","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem1","Caption":"Home","Icon":"sap-icon://home","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/SubConApp/Actions/NavToHome.action"},{"_Name":"ActionBarItem0","Caption":"Item","Icon":"sap-icon://cart","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/SubConApp/Actions/table.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/MaterialRequisitionForm.page":
/*!************************************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/MaterialRequisitionForm.page ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"Z_SUBC_MATNR_C"},"_Name":"SectionedTable0","Sections":[{"ObjectHeader":{"DetailImage":"sap-icon://product","DetailImageIsCircular":false,"HeadlineText":"{maktx}","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading"},"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader0","Visible":true},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"KeyAndValues":[{"Value":"{matnr}","_Name":"KeyValue1","KeyName":"Material Group","Visible":true},{"Value":"{meins}","_Name":"KeyValue2","KeyName":"UoM","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":"{matnr}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCode","IsVisible":true,"Separator":true,"Caption":"Material Number","PlaceHolder":"{matnr}","Enabled":true,"IsEditable":false},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCQuantity","IsVisible":true,"Separator":true,"Caption":"Quantity","PlaceHolder":"Enter quantity","KeyboardType":"Number","Enabled":true,"IsEditable":true},{"Value":"Enter Date","_Type":"Control.Type.FormCell.DatePicker","_Name":"FCReqDate","IsVisible":true,"Separator":true,"Caption":"Requirement Date","HelperText":"Please enter the requirement date","IsEditable":true,"Mode":"Datetime"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FCWBSNo","IsVisible":true,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"WBS No","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"Search":{"Enabled":true},"PickerItems":{"Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"Z_SUBC_wbs_C","QueryOptions":"$filter=pspid eq '{{#Page:ChooseDetails/#Control:FCSetProject/#SelectedValue}}'"},"ObjectCell":{"PreserveIconStackSpacing":true,"Selected":true,"Title":"{posid} {post1_wbs}","Visible":true},"ReturnValue":"{posid}"}}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"}]}],"_Type":"Page","_Name":"MaterialRequisitionForm","Caption":"MaterialRequisitionForm","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem1","Caption":"Cancel","Icon":"sap-icon://cancel","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/SubConApp/Actions/CloseModalPage_Cancel.action"},{"_Name":"ActionBarItem0","Caption":"Save","SystemItem":"Save","Icon":"sap-icon://save","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/SubConApp/Actions/addMaterialToCart.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/OrderItems.page":
/*!***********************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/OrderItems.page ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":"{ID}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCOrderID","IsVisible":true,"Separator":true,"Caption":"Order ID","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":false},{"Value":"{orderDate}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty2","IsVisible":true,"Separator":true,"Caption":"Order Date","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":false},{"Value":"{approvalStatus}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty1","IsVisible":true,"Separator":true,"Caption":"Approval Status","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":false}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":true,"EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"_Name":"SectionSimplePropertyCell0","KeyName":"Order Items","AccessoryType":"None","Visible":true}}],"Layout":{"NumberOfColumns":2}},{"Separators":{"TopSectionSeparator":true,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ObjectTable","Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"{@odata.readLink}/items"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true,"LeadingItems":[],"TrailingItems":[]},"Title":"{materialName} {materialCode}","Subhead":"{quantity} {uom}","DisplayDescriptionInMobile":true,"PreserveIconStackSpacing":false,"AccessoryType":"None","Tags":[],"AvatarStack":{"Avatars":[],"ImageIsCircular":true,"ImageHasBorder":false},"AvatarGrid":{"ImageIsCircular":true},"Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"DesignTimeTarget":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"Orders"},"_Type":"Page","_Name":"OrderItems","Caption":"Order Details","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Refresh","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/SubConApp/Actions/getWorflowStatus.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/Orders.page":
/*!*******************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/Orders.page ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ContactCell","Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"Orders","QueryOptions":"$orderby=orderDate desc"},"_Name":"SectionContactCell0","Visible":true,"EmptySection":{"FooterVisible":false},"ContactCell":{"Visible":true,"ContextMenu":{"PerformFirstActionWithFullSwipe":true},"DetailImage":"sap-icon://product","Headline":"{orderDate}","Subheadline":"{ID}","Description":"","OnPress":"/SubConApp/Actions/NavToOrderItems.action"},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50}}]}],"_Type":"Page","_Name":"Orders","Caption":"Orders","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/Plant.page":
/*!******************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/Plant.page ***!
  \******************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"Plants"},"_Name":"SectionContactCell0","Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"ContactCell":{"Visible":true,"ContextMenu":{"PerformFirstActionWithFullSwipe":true},"DetailImage":"res://contact.png","Headline":"{name}","Subheadline":"{code}","Description":"Description"},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50}}],"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"}}],"_Type":"Page","_Name":"Plant","Caption":"Plant","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/PreviousOrderDetails.page":
/*!*********************************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/PreviousOrderDetails.page ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Header":{"DataTable":{"Items":[{"Text":"RequestNo","NumberOfLines":1},{"Text":"OrderDate","NumberOfLines":1},{"Text":"Approver","NumberOfLines":1},{"Text":"Status","NumberOfLines":1}],"Layout":{"ColumnWidth":[100,100,100,100]}},"_Name":"SectionDataTableHeader0","AccessoryType":"None","UseTopPadding":true},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Row":{"Items":[{"Value":"{RequestNo}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{orderDate}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{approverEmailId}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{approvalStatus}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}}],"Layout":{"ColumnWidth":[100,100,100,100]}},"_Type":"Section.Type.DataTable","Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"Orders"},"_Name":"SectionDataTable0","Visible":true,"EmptySection":{"FooterVisible":false},"EditMode":"None","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50}}]}],"_Type":"Page","_Name":"PreviousOrderDetails","Caption":"PreviousOrderDetails","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Refresh","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/SubConApp/Actions/getWorkflowStatus.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/SubCon.page":
/*!*******************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/SubCon.page ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"SubContractorDetails"},"_Name":"SectionedTable0"}],"_Type":"Page","_Name":"SubCon","Caption":"SubCon","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Cancel","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/SubConApp/Actions/ClosePage.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/SubConDetails.page":
/*!**************************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/SubConDetails.page ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","Target":"/SubConApp/Rules/GetCustomer.js","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":"{partner}","_Type":"Control.Type.FormCell.SimpleProperty","DataSubscriptions":["Z_SUBC_CUST_C"],"_Name":"FCCustID","IsVisible":true,"Separator":true,"Caption":"Customer ID","PlaceHolder":"{partner}","Enabled":true,"IsEditable":false},{"Value":"{name}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCustName","IsVisible":true,"Separator":true,"Caption":"Name","PlaceHolder":"{name}","Enabled":true,"IsEditable":false},{"Value":"{vkorg}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCvkOrg","IsVisible":false,"Separator":true,"Caption":"SalesOrg","PlaceHolder":"PlaceHolder","Enabled":false,"IsEditable":false}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[{"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton1","Title":"Add Details","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://add","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/SubConApp/Actions/NavToChooseDetails.action"}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable1","Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[{"_Type":"ButtonTable.Type.Button","_Name":"SectionButton0","Title":"Browse Materials","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://search","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/SubConApp/Actions/NavToMaterialPage.action"},{"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton0","Title":"Previous Orders","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://my-sales-order","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/SubConApp/Actions/toPrevOrders.action"}]}]}],"DesignTimeTarget":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"Z_SUBC_CUST_C"},"_Type":"Page","_Name":"SubCon","Caption":"SubContractor Details","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","Icon":"sap-icon://cart","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/SubConApp/Actions/table.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/cartItems.page":
/*!**********************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/cartItems.page ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"MaterialRequisitions"},"_Name":"SectionedTable0","Section":{"_Type":"Section.Type.DataTable","Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"MaterialRequisitions"},"_Name":"SectionDataTable0","Header":{"_Name":"SectionDataTableHeader1","AccessoryType":"None","UseTopPadding":true,"DataTable":{"Items":[{"Text":"MR NO","NumberOfLines":1},{"Text":"Material Code","NumberOfLines":1}],"Layout":{"ColumnWidth":[]}}},"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"EditMode":"None","Row":{"Items":[{"Value":"{ID}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{materialCode}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}}],"Layout":{"ColumnWidth":[]}},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50}}}],"_Type":"Page","_Name":"cartItems","Caption":"cartItems","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/prevOrder.page":
/*!**********************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/prevOrder.page ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.DataTable","Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"Orders"},"_Name":"SectionDataTable0","Header":{"_Name":"SectionDataTableHeader0","AccessoryType":"None","UseTopPadding":true,"DataTable":{"Items":[{"Text":"RequestNo","NumberOfLines":1},{"Text":"OrderDate","NumberOfLines":1},{"Text":"department","NumberOfLines":1},{"Text":"ApproverEmailId","NumberOfLines":1},{"Text":"Status","NumberOfLines":1}],"Layout":{"ColumnWidth":[]}}},"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"EditMode":"None","Row":{"Items":[{"Value":"{orderDate}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{department}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{approverEmailId}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{RequestNo}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{approvalStatus}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}}],"Layout":{"ColumnWidth":[]}},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50}}],"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"}}],"_Type":"Page","_Name":"prevOrder","Caption":"prevOrder","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/subcontractor.page":
/*!**************************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/subcontractor.page ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"SubContractorDetails"},"_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"KeyAndValues":[{"Value":"{customerID}","_Name":"KeyValue0","KeyName":"CustomerID","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"KeyAndValues":[{"Value":"{plant}","_Name":"KeyValue2","KeyName":"Plant","Visible":true},{"Value":"{project}","_Name":"KeyValue3","KeyName":"ProjectCode","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[{"_Type":"ButtonTable.Type.Button","_Name":"SectionButton0","Title":"Browse Materials","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://search","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/SubConApp/Actions/NavToMaterialPage.action"},{"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton0","Title":"Previous Orders","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://my-sales-order","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/SubConApp/Actions/toPrevOrders.action"}]}]}],"_Type":"Page","_Name":"SubContractorDetails","Caption":"SubContractor Details","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","Icon":"sap-icon://cart","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/SubConApp/Actions/table.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/SubConApp/Pages/test.page":
/*!*****************************************************!*\
  !*** ./build.definitions/SubConApp/Pages/test.page ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","Target":{"Service":"/SubConApp/Services/SubCon.service","EntitySet":"SubContractorDetails"},"_Name":"SectionedTable0","Section":{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"KeyAndValues":[{"Value":"{customerID}","_Name":"KeyValue0","KeyName":"customerID","Visible":true},{"Value":"{customerName}","_Name":"KeyValue1","KeyName":"Name","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}}}],"_Type":"Page","_Name":"test","Caption":"Subcontractor Details","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Close","SystemItem":"Cancel","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/SubConApp/Actions/ClosePage.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"MainPage":"/SubConApp/Pages/Main.page","OnLaunch":["/SubConApp/Rules/Service/Initialize.js"],"OnWillUpdate":"/SubConApp/Rules/Application/OnWillUpdate.js","OnDidUpdate":"/SubConApp/Rules/Service/Initialize.js","Styles":"/SubConApp/Styles/Styles.less","Version":"/SubConApp/Globals/Application/AppDefinition_Version.global","Localization":"/SubConApp/i18n/i18n.properties","_SchemaVersion":"24.4","_Name":"SubConApp","StyleSheets":{"Styles":{"css":"/SubConApp/Styles/Styles.css","ios":"/SubConApp/Styles/Styles.nss","android":"/SubConApp/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/AddToCart.action":
/*!**************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/AddToCart.action ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.RestService.SendRequest","ActionResult":{"_Name":"AddToCart"},"OnFailure":"/SubConApp/Actions/GenericToastMessage.action","OnSuccessLog":{"Message":" Successfully added to cart #Page:MaterialDetails/#Control:FCCode/#Value","Level":"Off"},"OnFailureLog":{"Message":"failed","Level":"Off"},"Target":{"Service":"/SubConApp/Services/SubCon.service","Path":"/addToCart","RequestProperties":{"Method":"POST","Body":{"materialCode":"#Page:MaterialDetails/#Control:FCCode/#Value"}}}}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/Application/AppUpdate.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/Application/AppUpdate.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/SubConApp/Rules/Application/AppUpdateFailure.js","OnSuccess":"/SubConApp/Rules/Application/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/Application/AppUpdateFailureMessage.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/Application/AppUpdateFailureMessage.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/Application/AppUpdateProgressBanner.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/Application/AppUpdateProgressBanner.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/SubConApp/Actions/Application/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/Application/AppUpdateSuccessMessage.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/Application/AppUpdateSuccessMessage.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/Application/Logout.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/Application/Logout.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":true}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/Application/NavToAbout.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/Application/NavToAbout.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/SubConApp/Pages/Application/About.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/Application/NavToActivityLog.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/Application/NavToActivityLog.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/SubConApp/Pages/Application/UserActivityLog.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/Application/NavToSupport.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/Application/NavToSupport.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"NavigationType":"Cross","PageToOpen":"/SubConApp/Pages/Application/Support.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/Application/OnWillUpdate.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/Application/OnWillUpdate.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/Application/Reset.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/Application/Reset.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":false}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/Application/ResetMessage.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/Application/ResetMessage.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","Title":"Reset","OKCaption":"Yes","OnOK":"/SubConApp/Rules/Application/ResetAppSettingsAndLogout.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/Application/UserMenuPopover.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/Application/UserMenuPopover.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Enabled":true,"Icon":"sap-icon://headset","OnPress":"/SubConApp/Actions/Application/NavToSupport.action","Title":"Support","Visible":true},{"Enabled":true,"Icon":"sap-icon://refresh","OnPress":"/SubConApp/Actions/Application/AppUpdateProgressBanner.action","Title":"Check for Updates","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://hint","OnPress":"/SubConApp/Actions/Application/NavToAbout.action","Title":"About","Visible":true},{"Enabled":true,"Icon":"sap-icon://reset","OnPress":"/SubConApp/Actions/Application/ResetMessage.action","Title":"Reset","Visible":true},{"Enabled":true,"Icon":"sap-icon://log","OnPress":"/SubConApp/Actions/Application/Logout.action","Title":"Logout","Visible":"/SubConApp/Rules/Application/ClientIsMultiUserMode.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/CloseModalPage_Cancel.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/CloseModalPage_Cancel.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/CloseModalPage_Complete.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/CloseModalPage_Complete.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/ClosePage.action":
/*!**************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/ClosePage.action ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/GenericBannerMessage.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/GenericBannerMessage.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"GenericBannerMessage"},"Message":"#ActionResults:placeOrder/error"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/GenericMessageBox.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/GenericMessageBox.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"GenericMessageBox"},"Message":"Message","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/GenericNavigation.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/GenericNavigation.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"GenericNavigation"},"PageToOpen":"/SubConApp/Pages/Main.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/GenericToastMessage.action":
/*!************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/GenericToastMessage.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"GenericToastMessage"},"Message":"#ActionResults:clearCart/error"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/Logging/LogUploadFailure.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/Logging/LogUploadFailure.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Uploading log file failed with error: {#ActionResults:UploadLog/error}","OKCaption":"OK","Title":"Log Upload Failed","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/Logging/LogUploadSuccessful.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/Logging/LogUploadSuccessful.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":3,"IsIconHidden":false,"MaxNumberOfLines":1,"Message":"Log File Uploaded","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/Logging/UploadLog.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/Logging/UploadLog.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"ActionResult":{"_Name":"UploadLog"},"ActivityIndicatorText":"Uploading...","OnFailure":"/SubConApp/Actions/Logging/LogUploadFailure.action","OnSuccess":"/SubConApp/Actions/Logging/LogUploadSuccessful.action","ShowActivityIndicator":false,"_Type":"Action.Type.Logger.Upload"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/Logging/UploadLogProgress.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/Logging/UploadLogProgress.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionMessage":"Logs Uploaded","CompletionTimeout":2,"Message":"Uploading Log Files...","OnSuccess":"/SubConApp/Actions/Logging/UploadLog.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/NavToChooseDetails.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/NavToChooseDetails.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToChooseDetails"},"PageToOpen":"/SubConApp/Pages/ChooseDetails.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/NavToDetailPage.action":
/*!********************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/NavToDetailPage.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToDetailPage"},"PageToOpen":"/SubConApp/Pages/MaterialDetails.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/NavToHome.action":
/*!**************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/NavToHome.action ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToHome"},"PageToOpen":"/SubConApp/Pages/SubConDetails.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/NavToMRF.action":
/*!*************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/NavToMRF.action ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToMRF"},"PageToOpen":"/SubConApp/Pages/MaterialRequisitionForm.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/NavToMat.action":
/*!*************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/NavToMat.action ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToMat"},"PageToOpen":"/SubConApp/Pages/Mat.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/NavToMaterial.action":
/*!******************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/NavToMaterial.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToMaterial"},"PageToOpen":"/SubConApp/Pages/Material.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/NavToMaterialPage.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/NavToMaterialPage.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToMaterialPage"},"PageToOpen":"/SubConApp/Pages/Material.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/NavToOrderItems.action":
/*!********************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/NavToOrderItems.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToOrderItems"},"PageToOpen":"/SubConApp/Pages/OrderItems.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/NavToSubCon.action":
/*!****************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/NavToSubCon.action ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToSubCon"},"PageToOpen":"/SubConApp/Pages/SubConDetails.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/NavToSubcontractor.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/NavToSubcontractor.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToSubcontractor"},"PageToOpen":"/SubConApp/Pages/subcontractor.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/OrderErrorMsg.action":
/*!******************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/OrderErrorMsg.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"OrderErrorMsg"},"Message":"#ActionResults:placeOrder/error","Semantic":"Negative"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/OrderPlaced.action":
/*!****************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/OrderPlaced.action ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"OrderPlaced"},"Message":"Order Placed","Semantic":"Positive"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/RequisitionErrorMsg.action":
/*!************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/RequisitionErrorMsg.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"RequisitionErrorMsg"},"Message":"#ActionResults:addMaterialToCart/error","Animated":true,"Semantic":"Negative","Duration":15}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/SubCon/Service/InitializeOnline.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/SubCon/Service/InitializeOnline.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.Initialize","ActionResult":{"_Name":"init"},"OnFailure":"/SubConApp/Actions/SubCon/Service/InitializeOnlineFailureMessage.action","OnSuccess":"/SubConApp/Rules/filterCustomer.js","ShowActivityIndicator":true,"Service":"/SubConApp/Services/SubCon.service"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/SubCon/Service/InitializeOnlineFailureMessage.action":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/SubCon/Service/InitializeOnlineFailureMessage.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/ToCart.action":
/*!***********************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/ToCart.action ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"ToCart"},"PageToOpen":"/SubConApp/Pages/CartPage.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/ToOrders.action":
/*!*************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/ToOrders.action ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"ToOrders"},"PageToOpen":"/SubConApp/Pages/Orders.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/WorflowstastusUpdateSucess.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/WorflowstastusUpdateSucess.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"WorflowstastusUpdateSucess"},"Message":"Fetched Latest Approval Status !","Duration":15,"Semantic":"Positive"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/addMaterialToCart.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/addMaterialToCart.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.RestService.SendRequest","ActionResult":{"_Name":"addMaterialToCart"},"OnFailure":"/SubConApp/Actions/RequisitionErrorMsg.action","OnSuccess":"/SubConApp/Actions/CloseModalPage_Complete.action","Target":{"Service":"/SubConApp/Services/SubCon.service","Path":"/requestMaterial","RequestProperties":{"Method":"POST","Body":{"materialCode":"#Page:MaterialRequisitionForm/#Control:FCCode/#Value","wbsNo":"#Page:MaterialRequisitionForm/#Control:FCWBSNo/#SelectedValue","quantity":"#Page:MaterialRequisitionForm/#Control:FCQuantity/#Value","requirementDate":"#Page:MaterialRequisitionForm/#Control:FCReqDate/#Value","loggedInUserId":"#Application/#AppData/UserId"},"FetchCSRF":true}}}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/clearCart.action":
/*!**************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/clearCart.action ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.RestService.SendRequest","ActionResult":{"_Name":"clearCart"},"OnFailure":"/SubConApp/Actions/GenericToastMessage.action","Target":{"Service":"/SubConApp/Services/SubCon.service","Path":"/clearCart","RequestProperties":{"Method":"POST","Body":{},"FetchCSRF":true}}}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/getSubcontractorDetails.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/getSubcontractorDetails.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.RestService.SendRequest","ActionResult":{"_Name":"getSubcontractorDetails"},"OnFailure":"/SubConApp/Actions/subconDetailsFailed.action","OnSuccess":"/SubConApp/Actions/NavToSubCon.action","Target":{"Service":"/SubConApp/Services/SubCon.service","Path":"/getSubContractorDetails","RequestProperties":{"Method":"POST","Body":{"email":"#Application/#AppData/UserId"},"FetchCSRF":true}}}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/getWorkflowStatus.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/getWorkflowStatus.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.RestService.SendRequest","ActionResult":{"_Name":"getWorkflowStatus"},"Target":{"Service":"/SubConApp/Services/SubCon.service","Path":"/getWorkflowStatus","RequestProperties":{"Method":"POST","FetchCSRF":true}}}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/navToItems.action":
/*!***************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/navToItems.action ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"navToItems"},"PageToOpen":"/SubConApp/Pages/cartItems.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/placeOrder.action":
/*!***************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/placeOrder.action ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.RestService.SendRequest","ActionResult":{"_Name":"placeOrder"},"OnFailure":"/SubConApp/Actions/GenericBannerMessage.action","OnSuccess":"/SubConApp/Actions/OrderPlaced.action","Target":{"Service":"/SubConApp/Services/SubCon.service","Path":"/placeOrder","RequestProperties":{"Method":"POST","Body":{},"FetchCSRF":true}}}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/setSubconDetails.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/setSubconDetails.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.RestService.SendRequest","ActionResult":{"_Name":"setSubconDetails"},"OnSuccess":"/SubConApp/Actions/CloseModalPage_Complete.action","Target":{"Service":"/SubConApp/Services/SubCon.service","Path":"/setplantProjectDeptDetails","RequestProperties":{"Method":"POST","Body":{"customerID":"#Page:SubCon/#Control:FCCustID/#Value","customerName":"#Page:SubCon/#Control:FCCustName/#Value","plant":"#Page:ChooseDetails/#Control:FCSetPlant/#SelectedValue","projectCode":"#Page:ChooseDetails/#Control:FCSetProject/#SelectedValue","department":"#Page:ChooseDetails/#Control:FCDept/#SelectedValue","vkOrg":"#Page:SubCon/#Control:FCvkOrg/#Value","loggedInUserId":"#Application/#AppData/UserId"},"FetchCSRF":true}}}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/subconDetailsFailed.action":
/*!************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/subconDetailsFailed.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"subconDetailsFailed"},"Message":"#ActionResults:getSubcontractorDetails/error","Duration":15,"Semantic":"Negative"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/table.action":
/*!**********************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/table.action ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"table"},"PageToOpen":"/SubConApp/Pages/DataTable.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/toPrev.action":
/*!***********************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/toPrev.action ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"toPrev"},"PageToOpen":"/SubConApp/Pages/prevOrder.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/toPrevOrders.action":
/*!*****************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/toPrevOrders.action ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"toPrevOrders"},"PageToOpen":"/SubConApp/Pages/PreviousOrderDetails.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/toSubCon2.action":
/*!**************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/toSubCon2.action ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"toSubCon2"},"PageToOpen":"/SubConApp/Pages/SubCon.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/toTest.action":
/*!***********************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/toTest.action ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"toTest"},"PageToOpen":"/SubConApp/Pages/test.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/tomrf.action":
/*!**********************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/tomrf.action ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"tomrf"},"PageToOpen":"/SubConApp/Pages/MRF.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/toplant.action":
/*!************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/toplant.action ***!
  \************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"toplant"},"PageToOpen":"/SubConApp/Pages/Plant.page"}

/***/ }),

/***/ "./build.definitions/SubConApp/Actions/worflowStatusUpdatedFailedMsg.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/SubConApp/Actions/worflowStatusUpdatedFailedMsg.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"worflowStatusUpdatedFailedMsg"},"Message":"#ActionResults:getWorflowStatus/error","Duration":15,"Semantic":"Negative"}

/***/ }),

/***/ "./build.definitions/SubConApp/Globals/Application/AppDefinition_Version.global":
/*!**************************************************************************************!*\
  !*** ./build.definitions/SubConApp/Globals/Application/AppDefinition_Version.global ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/SubConApp/Globals/Application/ApplicationName.global":
/*!********************************************************************************!*\
  !*** ./build.definitions/SubConApp/Globals/Application/ApplicationName.global ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"MDK App","_Type":"String"}

/***/ }),

/***/ "./build.definitions/SubConApp/Globals/Application/SupportEmail.global":
/*!*****************************************************************************!*\
  !*** ./build.definitions/SubConApp/Globals/Application/SupportEmail.global ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"support@mycompany.com","_Type":"String"}

/***/ }),

/***/ "./build.definitions/SubConApp/Globals/Application/SupportPhone.global":
/*!*****************************************************************************!*\
  !*** ./build.definitions/SubConApp/Globals/Application/SupportPhone.global ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1-800-677-7271","_Type":"String"}

/***/ }),

/***/ "./build.definitions/SubConApp/Services/SubCon.service":
/*!*************************************************************!*\
  !*** ./build.definitions/SubConApp/Services/SubCon.service ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"SubConService","OfflineEnabled":false,"SourceType":"Mobile","RestService":true}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "./build.definitions/SubConApp/Styles/Styles.json":
/*!********************************************************!*\
  !*** ./build.definitions/SubConApp/Styles/Styles.json ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/SubConApp/jsconfig.json":
/*!***************************************************!*\
  !*** ./build.definitions/SubConApp/jsconfig.json ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"module":"esnext","target":"es2019","moduleResolution":"node","lib":["esnext","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map