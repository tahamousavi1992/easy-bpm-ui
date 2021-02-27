import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class EntityDefService {
    constructor() {

    }
    async getList(data) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsEntityManager/GetList', data);
    }
    async getProperties(entityDefId) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsEntityManager/GetRelationProperties', { EntityDefId: entityDefId });
    }
    async get(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsEntityManager/GetAddEdit', { ID: id });
    }
    async update(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsEntityManager/PostAddEdit', data);
    }
    async delete(id) {
        return await new UtilityService().deleteData(new BpmsConfig().AdminUrl + 'BpmsEntityManager/Delete', { ID: id });
    }
    async inActive(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsEntityManager/GetInActive', { ID: id });
    }
    async active(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsEntityManager/GetActive', { ID: id });
    }
    async executeQuery(id, query) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsEntityManager/ExecuteQuery', { EntityId: id, Query: query });
    }
}

export default EntityDefService;