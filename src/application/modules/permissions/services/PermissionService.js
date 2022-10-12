import BaseService from "../../../../common/services/BaseService";
import axios from "axios";

class PermissionService extends BaseService {

    constructor() {
        super("Permission");
    }

    async getAllAsync(id, params) {
        return await axios.get(this.apiUrl + "/all");
    };
}

export default PermissionService;