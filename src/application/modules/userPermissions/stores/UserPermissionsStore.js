import UserService from "../../users/services/UserService";
import PermissionService from "../../permissions/services/PermissionService";
import { makeAutoObservable } from "mobx";



class UserPermissionsStore {
    user = null;
    userPermissionsIds = [];
    permissions = [];
    userIncludeItems = 'UserPermissions';
    
    constructor(){
        this.userService = new UserService();
        this.permissionService = new PermissionService();

        makeAutoObservable(this);
    }

    async getUserByIdAsync(userId){
        var response = await this.userService.getByIdAsync(userId, { includeItems: this.userIncludeItems });
        this.user = response.data;
        if(response.data.userPermissions){
            this.userPermissionsIds = response.data.userPermissions.map(x => x.permissionId);
        }
    }

    async getPermissionsAsync(){
        var response = await this.permissionService.getAsync()
        this.permissions = response.data.items;
    }

    async changePermission(permissionId){
        var userPermission = this.user.userPermissions.find(x => x.permissionId === permissionId);
        if(userPermission){
            await this.userService.removePermissionAsync(userPermission.id);
        } else {
            await this.userService.addPermissionAsync(this.user.id, permissionId);
        }
        this.getUserByIdAsync(this.user.id);
    }
}

export default UserPermissionsStore