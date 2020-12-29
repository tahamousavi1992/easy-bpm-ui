import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class DocumentDefService {
    constructor() {

    }
    async getList(data) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDocument/GetDocumentDefListx', data);
    }
    async get(id, documentFolderID) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDocument/GetAddEditDocumentDef', { id: id, documentFolderID: documentFolderID });
    }
    async update(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsDocument/PostAddEditDocumentDef', data);
    }
    async inActive(id) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsDocument/GetInActiveDocumentDef', { id: id });
    }
}

export default DocumentDefService;