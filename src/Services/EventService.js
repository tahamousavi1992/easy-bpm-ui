import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class EventService {
    constructor() {

    }
    async getIndex(processId, elementId) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsEvent/GetIndex', {
            ProcessId: processId,
            ElementId: elementId
        });
    }

    async getThrowMessageParams(messageTypeID) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsEvent/GetThrowMessageParams', {
            MessageTypeID: messageTypeID,
        });
    }

    async postSubTypeEmail(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsEvent/PostSubTypeEmail', data);
    }

    async postSaveSubTypeMessage(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsEvent/PostSaveSubTypeMessage', data);
    }

    async postSubTypeTimer(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsEvent/PostSubTypeTimer', data);
    }

}

export default EventService;