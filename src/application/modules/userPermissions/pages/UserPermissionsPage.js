import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom"
import { useStore } from "../../../../stores";
import { useEffect } from "react";
import Switch from "react-switch";

const UserPermissionsPage = () => {
    const { userPermissionsStore } = useStore();
    let { id } = useParams(); 

    useEffect(() => {
        userPermissionsStore.getPermissionsAsync();
        userPermissionsStore.getUserByIdAsync(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h3>User: { userPermissionsStore.user ? userPermissionsStore.user.firstName + " " + userPermissionsStore.user.lastName : "" }</h3>
            {userPermissionsStore.permissions.map((permission, index) => 
                <div key={index}>
                    <label>{permission.code}</label>
                    <br></br>
                    <label>{permission.description}</label>
                    <hr></hr>
                    <Switch onChange={() => userPermissionsStore.changePermission(permission.id)} checked={userPermissionsStore.userPermissionsIds.some(x => x === permission.id)}></Switch>
                </div> 
            )}
        </div>
    )
}

export default observer(UserPermissionsPage);