import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class ConfigurationService {
    constructor() {

    }
    async get() {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsConfiguration/GetAddEdit', {});
    }
    async update(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsConfiguration/PostAddEdit', data);
    }
}

export default ConfigurationService;