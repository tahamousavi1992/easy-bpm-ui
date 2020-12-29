import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class DocumentFolderService {
    constructor() {
       
    }
    async getList(data) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDocument/GetFolderList', data);
    }
    async get(id,parentId) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDocument/GetAddEditFolder', { id: id, parentId: parentId });
    }
    async update(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDocument/PostAddEditFolder', data);
    }
    async inActive(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDocument/GetInActiveFolder', { id: id });
    }
}

export default DocumentFolderService;