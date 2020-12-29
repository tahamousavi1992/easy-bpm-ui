import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class ThreadManageService {
    constructor() {

    }
 
    async getList(data) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsThread/GetList', data);
    }

    async delete(id) {
        return await new UtilityService().deleteData(new BpmsConfig().AdminUrl + 'BpmsThread/Delete', { ID: id });
    }

    async getThreadDetail(threadID) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsThread/GetThreadDetail', {
            ThreadID: threadID
        });
    }
}

export default ThreadManageService;