import UserService from "../../users/services/UserService";
import PermissionService from "../../permissions/services/PermissionService";
import { makeAutoObservable, runInAction } from "mobx";

const userIncludeItems = 'UserPermissions';

class UserPermissionsStore {
    user;
    userPermissionsIds = [];
    permissions = [];


    constructor() {
        this.userService = new UserService();
        this.permissionService = new PermissionService();

        makeAutoObservable(this);
    }

    async getUserByIdAsync(userId) {
        var response = await this.userService.getByIdAsync(userId, { includeItems: userIncludeItems });
        this.user = response.data;
        if (response.data.userPermissions) {
            this.userPermissionsIds = response.data.userPermissions.map(x => x.permissionId);
        }
    }

    async getPermissionsAsync() {
        var response = await this.permissionService.getAsync()
        runInAction(() => {
            this.permissions = response.data.items;
        })
    }

    async changePermission(permissionId) {
        var userPermission = this.user.userPermissions.find(x => x.permissionId === permissionId);
        if (userPermission) {
            await this.userService.removePermissionAsync(userPermission.id);
        } else {
            await this.userService.addPermissionAsync({ userId: this.user.id, permissionId: permissionId });
        }
        this.getUserByIdAsync(this.user.id);
    }
}

export default UserPermissionsStore