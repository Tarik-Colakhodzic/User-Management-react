import BaseService from "../../../../common/services/BaseService";
import axios from "axios";

class UserService extends BaseService {
    userPermissionPath = "/userpermissions";

    constructor() {
        super("User");
    }

    async getByIdAsync(id, params) {
        return await axios.get(this.apiUrl + "/" + id + this.userPermissionPath, { params: params });
    };

    async addPermissionAsync(userId, permissionId){
        return await axios.post(this.apiUrl + "/" + userId + this.userPermissionPath + "/" + permissionId);
    }

    async removePermissionAsync(userPermissionId){
        return await axios.delete(this.apiUrl + this.userPermissionPath + "/" + userPermissionId);
    }
}

export default UserService;