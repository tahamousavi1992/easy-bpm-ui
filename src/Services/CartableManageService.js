import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class CartableManageService {
    constructor() {

    }
    async getList(data) {
        return await new UtilityService().getData(new BpmsConfig().CartableUrl + 'CartableManage/GetIndex', data);
    }
    async getListProcess(data) {
        return await new UtilityService().getData(new BpmsConfig().CartableUrl + 'CartableManage/GetListProcess', data);
    }
    async getThreadIndex(data) {
        return await new UtilityService().getData(new BpmsConfig().CartableUrl + 'CartableManage/GetThreadIndex', data);
    }
    async getPagesForMenu() {
        return await new UtilityService().getData(new BpmsConfig().CartableUrl + 'CartableManage/GetPagesForMenu', {});
    }

    async getBeginTask(processID) {
        return await new UtilityService().getData(new BpmsConfig().CartableUrl + 'CartableManage/GetBeginTask', { ProcessID: processID });
    }

    async getThreadDetail(threadID) {
        return await new UtilityService().getData(new BpmsConfig().CartableUrl + 'CartableManage/GetThreadDetail', {
            ThreadID: threadID
        });
    }
}

export default CartableManageService;