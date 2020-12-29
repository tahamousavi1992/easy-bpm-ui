import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class UserService {
    constructor() {
       
    }
    async getList(data) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsUser/GetList', data);
    }
    async get(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsUser/GetAddEdit', { ID: id });
    }
    async update(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsUser/PostAddEdit', data);
    }
    async delete(id) {
        return await new UtilityService().deleteData(new BpmsConfig().AdminUrl + 'BpmsUser/Delete', { ID: id } );
    }
}

export default UserService;