import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class GatewayService {
    constructor() {

    }
    async getConditions(processId, elementId) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsCondition/GetConditions', {
            ProcessId: processId,
            ElementId: elementId
        });
    }
    async postAddEdit(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsCondition/PostAddEdit', data);
    } 
}

export default GatewayService;