import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class DepartmentService {
    constructor() {
       
    }
    async getList(data) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDepartment/GetList', data);
    }
    async get(id,parentId) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDepartment/GetAddEdit', { ID: id, ParentId: parentId });
    }
    async update(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDepartment/PostAddEdit', data);
    }
    async inActive(id) { 
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDepartment/GetInActive', { ID: id });
    }

    async delete(id) {
        return await new UtilityService().deleteData(new BpmsConfig().AdminUrl + 'BpmsDepartment/Delete', { ID: id });
    }
}

export default DepartmentService;