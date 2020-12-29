import BpmsConfig from '../Shared/BpmsConfig'
import UtilityService from './UtilityService'
class AssemblyFileService {
    constructor() {
       
    }
    async getList() {
        return await new UtilityService().getData(new BpmsConfig().AdminUrl + 'BpmsAssembly/GetList', {});
    }

    async update(data) {
        return await new UtilityService().postData(new BpmsConfig().AdminUrl + 'BpmsAssembly/PostFile', data);
    }
 
    async delete(name) {
        return await new UtilityService().deleteData(new BpmsConfig().AdminUrl + 'BpmsAssembly/Delete', { fileName: name });
    }
}

export default AssemblyFileService;