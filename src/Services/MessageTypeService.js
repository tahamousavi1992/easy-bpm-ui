import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class MessageTypeService {
    constructor() {
       
    }
    async getList(data) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsMessageType/GetList', data);
    }
    async get(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsMessageType/GetAddEdit', { ID: id });
    }
    async update(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsMessageType/PostAddEdit', data);
    }
    async inActive(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsMessageType/GetInActive', { ID: id });
    }
}

export default MessageTypeService;