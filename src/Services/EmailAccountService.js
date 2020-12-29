import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class EmailAccountService {
    constructor() {
       
    }
    async getList(data) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsEmailAccount/GetList', data);
    }
    async get(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsEmailAccount/GetAddEdit', { ID: id });
    }
    async update(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsEmailAccount/PostAddEdit', data);
    }
    async delete(id) {
        return await new UtilityService().deleteData(new BpmsConfig().AdminUrl + 'BpmsEmailAccount/Delete', { ID: id } );
    }
    async test(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsEmailAccount/TestEmail', data);
    }
}

export default EmailAccountService;