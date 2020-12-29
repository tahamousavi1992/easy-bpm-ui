import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class ProcessService {
    constructor() {

    }
    async getList(data) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsProcess/GetList', data);
    }
    async getAdd(processGroupID) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsProcess/GetAdd', { ProcessGroupID: processGroupID });
    }
    async update(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsProcess/PostAdd', data);
    }
    async inActive(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsProcess/GetInActive', { ID: id });
    }
    async active(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsProcess/GetActive', { ID: id });
    }
    async getPublish(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsProcess/GetPublish', { ID: id });
    }
    async getNewVersion(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsProcess/GetNewVersion', { ID: id });
    }
    async delete(id) {
        return await new UtilityService().deleteData(new BpmsConfig().AdminUrl + 'BpmsProcess/Delete', { ID: id });
    }
    async getDesignerIndex(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDesigner/GetIndex', { ID: id });
    }
    async designerPostEdit(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDesigner/PostEdit', data);
    }

    async getDesignerEditInfo(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDesigner/GetEditInfo', { ID: id });
    }

    async postDesignerEditInfo(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDesigner/PostEditInfo', data);
    }
}

export default ProcessService;