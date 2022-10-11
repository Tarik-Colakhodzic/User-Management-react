import UserService from "../../users/services/UserService";
import UserPermissionsService from "../services/UserPermissionsService";
import PermissionService from "../../permissions/services/PermissionService";
import { makeAutoObservable } from "mobx";

class UserPermissionsStore {
    user = null;
    userPermissionsIds = [];
    permissions = [];

    constructor(){
        this.userPermissionsService = new UserPermissionsService();
        this.userService = new UserService();
        this.permissionService = new PermissionService();

        this.userPermissionsIds = [1];

        makeAutoObservable(this);
    }

    async getUserByIdAsync(userId){
        var response = await this.userService.getByIdAsync(userId);
        this.user = response.data;
    }

    async getPermissionsAsync(){
        var response = await this.permissionService.getAsync()
        this.permissions = response.data.items;
    }

    async changePermission(permissionId){
        console.log(permissionId);
    }
}

export default UserPermissionsStore