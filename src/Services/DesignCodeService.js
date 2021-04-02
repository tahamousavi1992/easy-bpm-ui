import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class DesignCodeService {
    constructor() {

    }

    async getDynamicFormJavaScript(dynamicFormId) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDesignCode/GetDynamicFormOnloadJavaCode', { DynamicFormId: dynamicFormId });
    }

    async getJavaScriptIndex(dynamicFormId, callBack, code) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDesignCode/GetJavaScriptIndex', {
            DynamicFormId: dynamicFormId,
            CallBack: callBack,
            Code: code
        });
    }

    async postIndex(callBack, dynamicFormId, designCode, codeType, processId, applicationPageId) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDesignCode/PostIndex', {
            DynamicFormId: dynamicFormId,
            CallBack: callBack,
            ProcessId: processId,
            ApplicationPageId: applicationPageId,
            DesignCode: designCode,
            CodeType: codeType
        });
    }

    async getDynamicFormCode(callBack, dynamicFormId, isOnExitForm, processId, applicationPageId) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDesignCode/GetDynamicFormCode', {
            DynamicFormId: dynamicFormId,
            CallBack: callBack,
            IsOnExitForm: isOnExitForm,
            ProcessId: processId,
            ApplicationPageId: applicationPageId,
        });
    }

    async getServiceTaskCode(elementId, processId) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDesignCode/GetServiceTaskCode', {
            ElementId: elementId,
            ProcessId: processId
        });
    }


    async doRenderCode(xmlCode, processId, applicationPageId, onlyConditional, addGotoLabel) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDesignCode/DoRenderCode', {
            ProcessId: processId,
            ApplicationPageId: applicationPageId,
            OnlyConditional: onlyConditional,
            AddGotoLabel: addGotoLabel,
            XmlCode: xmlCode,
        });
    }

    async postLoadConditionForm(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDesignCode/PostLoadConditionForm', data);
    }

    async postLoadDesignCodeActionList(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDesignCode/PostLoadDesignCodeActionList', data);
    }

    async postLoadCallMethodForm(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDesignCode/PostLoadCallMethodForm', data);
    }

    async postLoadSetVariableForm(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDesignCode/PostLoadSetVariableForm', data);
    }

    async postLoadSetControlForm(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDesignCode/PostLoadSetControlForm', data);
    }

    async postLoadWebServiceForm(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDesignCode/PostLoadWebServiceForm', data);
    }

    async postLoadEmailForm(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDesignCode/PostLoadEmailForm', data);
    }

    async postLoadEntityForm(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDesignCode/PostLoadEntityForm', data);
    }

    async getEntityProperties(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDesignCode/GetEntityProperties', { ID: id });
    }

    async postLoadExpressionCodeForm(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDesignCode/PostLoadExpressionCodeForm', data);
    }

    async postLoadSqlFunctionForm(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDesignCode/PostLoadSqlFunctionForm', data);
    }
}

export default DesignCodeService;