import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class CartablePageService {
    constructor() {

    }
    async getIndex(applicationPageId) {
        return await new UtilityService().getData(new BpmsConfig().CartableUrl + 'CartablePage/GetIndex', { applicationPageId: applicationPageId });
    }
}

export default CartablePageService;