import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class DepartmentMemberService {
    constructor() {
       
    }
    async getList(data) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDepartmentMember/GetList', data);
    }
    async get(id,parentId) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDepartmentMember/GetAddEdit', { UserID: id, DepartmentID: parentId });
    }
    async update(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDepartmentMember/PostAddEdit', data);
    }
    async delete(id) {
        return await new UtilityService().deleteData(new BpmsConfig().AdminUrl + 'BpmsDepartmentMember/Delete', { ID: id });
    }
}

export default DepartmentMemberService;