import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class StyleSheetService {
    constructor() {
       
    }
    async getList() {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsStyleSheet/GetList', {});
    }

    async postFile(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsStyleSheet/PostFile', data);
    }
 
    async delete(name) {
        return await new UtilityService().deleteData(new BpmsConfig().AdminUrl + 'BpmsStyleSheet/Delete', { fileName: name });
    }

    async get(fileName) {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsStyleSheet/GetAddEdit', { fileName: fileName });
    }

    async update(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsStyleSheet/PostAddEdit', data);
    }
}

export default StyleSheetService;