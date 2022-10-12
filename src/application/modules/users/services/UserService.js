import BaseService from "../../../../common/services/BaseService";
import axios from "axios";

class UserService extends BaseService {
    userPermissionPath = "userpermissions";

    constructor() {
        super("User");
    }

    async getByIdAsync(id, params) {
        return await axios.get(this.apiUrl + "/" + id + "/" + this.userPermissionPath, { params: params });
    };

    async addPermissionAsync(params){
        return await axios.post(this.apiUrl + "/" + this.userPermissionPath, params);
    }

    async removePermissionAsync(userPermissionId){
        return await axios.delete(this.apiUrl + this.userPermissionPath + "/" + userPermissionId);
    }
}

export default UserService;