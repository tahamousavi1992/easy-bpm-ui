import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class ConnectionService {
    constructor() {
       
    }
    async getList(data) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDbManager/GetList', data);
    }
    async get(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDbManager/GetAddEdit', { ID: id });
    }
    async update(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDbManager/PostAddEdit', data);
    }
    async delete(id) {
        return await new UtilityService().deleteData(new BpmsConfig().AdminUrl + 'BpmsDbManager/Delete', { ID: id } );
    }
    async test(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDbManager/TestConnectionString', data);
    }
}

export default ConnectionService;