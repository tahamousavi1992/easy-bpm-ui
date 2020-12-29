import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class TaskService {
    constructor() {

    }
    async getIndex(processId, elementId) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsTask/GetIndex', {
            ProcessId: processId,
            ElementId: elementId
        });
    }
    async postAddEditUserTask(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsTask/PostAddEditUserTask', data);
    }
    async postAddEditServiceTask(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsTask/PostAddEditServiceTask', data);
    }
}

export default TaskService;