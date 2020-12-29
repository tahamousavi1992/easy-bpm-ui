import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class JavaScriptService {
    constructor() {
       
    }
    async getList() {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsJavaScript/GetList', {});
    }

    async update(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsJavaScript/PostFile', data);
    }
 
    async delete(name) {
        return await new UtilityService().deleteData(new BpmsConfig().AdminUrl + 'BpmsJavaScript/Delete', { fileName: name });
    }
}

export default JavaScriptService;