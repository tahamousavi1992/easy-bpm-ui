import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class ProcessGroupService {
    constructor() {

    }
    async getList(data) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsProcessGroup/GetList', data);
    }
    async get(id, parentId) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsProcessGroup/GetAddEdit', { ID: id, ParentID: parentId });
    }
    async update(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsProcessGroup/PostAddEdit', data);
    }
    async delete(id) {
        return await new UtilityService().deleteData(new BpmsConfig().AdminUrl + 'BpmsProcessGroup/Delete', { ID: id });
    }
}

export default ProcessGroupService;