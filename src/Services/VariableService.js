import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class VariableService {
    constructor() {

    }
    async getList(applicationPageId, processId) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsVariableManager/GetList', { ApplicationPageId: applicationPageId, ProcessId: processId });
    }

    async get(id, variableName, processId, applicationPageId) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsVariableManager/GetAddEdit', { ID: id, VariableName: variableName, ProcessId: processId, ApplicationPageId: applicationPageId });
    }

    async getSelectVariable(isListVariable, searchVariable, processId, applicationPageId, selectedVariable) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsVariableManager/GetSelectVariable', {
            isListVariable: isListVariable,
            selectedVariable: selectedVariable,
            ProcessId: processId,
            ApplicationPageId: applicationPageId,
            searchVariable: searchVariable
        });
    } 

    async getEntityProperty(entityId) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsVariableManager/GetEntityProperty', { EntityID: entityId });
    }
    async getEntityPropertyByVariableId(variableId) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsVariableManager/GetEntityProperty', { VariableID: variableId });
    }

    async getVariableData(processId, applicationID) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsVariableManager/GetVariableData', {
            ProcessId: processId,
            ApplicationPageId: applicationID
        });
    }

    async update(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsVariableManager/PostAddEdit', data);
    }

    async delete(id) {
        return await new UtilityService().deleteData(new BpmsConfig().AdminUrl + 'BpmsVariableManager/Delete', { ID: id });
    }

}

export default VariableService;