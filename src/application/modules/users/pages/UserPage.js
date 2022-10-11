import { useEffect } from "react";
import { useStore } from "../../../../stores";
import { observer } from "mobx-react";
import Switch from "react-switch";

const UserPage = () => {
    const { userStore } = useStore();

    useEffect(() => {
        userStore.getUsersAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div>
                <input ref={userStore.firstName} placeholder="First name"></input>
                <input ref={userStore.lastName} placeholder="Last name"></input>
                <input ref={userStore.username} placeholder="Username"></input>
                <input ref={userStore.email} placeholder="Email"></input>
                <label>Active <Switch onChange={() => userStore.changeStatus()} checked={userStore.status}></Switch> </label>
                <button onClick={() => userStore.getUsersAsync()} >Search</button>
                {userStore.noUsers ? 'No users!' :
                    <table>
                        <thead>
                            <tr>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        
                            <tbody>
                                {userStore.userList.map((user, index) =>
                                    <tr key={index}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.status ? 'Active' : 'Non active'}</td>
                                        <td>
                                            <button onClick={() => userStore.goToEditCreatePage(user.id)}>Edit</button>
                                            <button onClick={() => userStore.confirmDeleteUser(user.id)}>Delete</button>
                                            <button onClick={() => userStore.goToUserPermissionsPage(user.id)}>Assing</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                    </table>
                }
                <button onClick={() => userStore.goToEditCreatePage()} >Create new user</button>
            </div>
        </div>
    )
}

export default observer(UserPage);