import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
export default class SingleActionService {
    constructor() {

    }
    async getIndex(data) {
        return await new UtilityService().getData(new BpmsConfig().SingleActionUrl + 'SingleActionWorker/GetIndex', data);
    }
} 