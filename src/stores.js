import { createContext, useContext } from "react";
import UserPermissionsStore from "./application/modules/userPermissions/stores/UserPermissionsStore";
import UserStore from "./application/modules/users/stores/UserStore";

const store = {
    userStore: new UserStore(),
    userPermissionsStore: new UserPermissionsStore()
}

export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext(StoreContext);
}

export default store;