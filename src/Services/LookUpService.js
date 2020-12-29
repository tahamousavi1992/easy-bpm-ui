import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class LookUpService {
    constructor() {
       
    }
    async getList(data) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsLURow/GetList', data);
    }
    async get(id, luTableId) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsLURow/GetAddEdit', { ID: id, LUTableID: luTableId });
    }
    async update(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsLURow/PostAddEdit', data);
    }
    async inActive(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsLURow/GetInActive', { ID: id });
    }
    async delete(id) {
        return await new UtilityService().deleteData(new BpmsConfig().AdminUrl + 'BpmsLURow/Delete', { ID: id });
    }
}

export default LookUpService;