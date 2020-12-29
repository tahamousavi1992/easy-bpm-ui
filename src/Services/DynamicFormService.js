import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class DynamicFormService {
    constructor() {

    }
    async getList(data) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDynamicForm/GetList', data);
    }
    async get(id, processId) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDynamicForm/GetAddEdit', { ID: id, ProcessId: processId });
    }
    async update(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDynamicForm/PostAddEdit', data);
    }

    async updateDesign(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDynamicForm/PostAddEditFormDesign', data);
    }

    async delete(id) {
        return await new UtilityService().deleteData(new BpmsConfig().AdminUrl + 'BpmsDynamicForm/Delete', { ID: id });
    }

    async copy(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDynamicForm/GetCopy', { ID: id });
    }

    async GetFolderList(data) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDynamicForm/GetDocumentFolder', data);
    }

    async getEditAppPage(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDynamicForm/GetEditApplicationPage', { ApplicationPageID: id });
    }

    async getAddEditFormDesign(id, applicationPageID) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDynamicForm/GetAddEditFormDesign', { ID: id, ApplicationPageID: applicationPageID });
    }

    async updateAppPage(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDynamicForm/PostEditApplicationPage', data);
    }

    async getStyle(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDynamicForm/GetAddEditStyleSheet', { DynamicFormId: id });
    }

    async updateStyle(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDynamicForm/PostAddEditStyleSheet', data);
    }

    async postAddEditOnExitFormCode(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDynamicForm/PostAddEditOnExitFormCode', data);
    }

    async postAddEditOnEntryFormCode(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDynamicForm/PostAddEditOnEntryFormCode', data);
    }

    async updateJavaScript(dynamicFormId, functionCode) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDynamicForm/PostOnLoadScriptCode', {
            DynamicFormId: dynamicFormId,
            FunctionCode: functionCode
        });
    }

    async getPreviewForm(formId) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDynamicForm/GetPreviewForm', { FormId: formId });
    }
}

export default DynamicFormService;