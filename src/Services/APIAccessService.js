import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class APIAccessService {
    constructor() {
       
    }
    async getList(data) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsAPIAccess/GetList', data);
    }
    async get(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsAPIAccess/GetAddEdit', { ID: id });
    }
    async update(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsAPIAccess/PostAddEdit', data);
    }
    async active(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsAPIAccess/GetActive', { ID: id } );
    }
    async inActive(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsAPIAccess/GetInActive', { ID: id });
    }
    async delete(id) {
        return await new UtilityService().deleteData(new BpmsConfig().AdminUrl + 'BpmsAPIAccess/Delete', { ID: id });
    }
}

export default APIAccessService;