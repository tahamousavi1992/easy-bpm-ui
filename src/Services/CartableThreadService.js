import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class CartableThreadService {
    constructor() {

    }
    async getIndex(threadTaskID, stepID) {
        return await new UtilityService().getData(new BpmsConfig().CartableUrl + 'CartableThread/GetIndex', {
            threadTaskID: threadTaskID,
            stepID: stepID
        });
    }
}

export default CartableThreadService;