import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../../../stores";
import { observer } from "mobx-react";
import Switch from "react-switch";

const EditCreateUserPage = () => {
    const { userStore } = useStore();
    let { id } = useParams();
    const isCreate = id === 'undefined';

    useEffect(() => {
        if (isCreate) {
            return;
        }
        userStore.getUserByIdAsync(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <label>First name</label>
            <br></br>
            <input ref={userStore.userFirstName}></input>
            <br></br>
            <label>Last name</label>
            <br></br>
            <input ref={userStore.userLastName}></input>
            <br></br>
            <label>Email</label>
            <br></br>
            <input ref={userStore.userEmail}></input>
            <br></br>
            <label>Active <Switch onChange={() => userStore.changeUserStatus()} checked={userStore.userStatus}></Switch> </label>
            <br></br>
            {isCreate ?
                <>
                    <label>Username</label>
                    <br></br>
                    <input ref={userStore.userUsername}></input>
                    <br></br>
                    <label>Password</label>
                    <br></br>
                    <input ref={userStore.userPassword}></input>
                    <br></br>
                </>
                : ""
            }
            <button onClick={() => userStore.saveUser(id, isCreate)} >Save</button>
        </div>
    )
}

export default observer(EditCreateUserPage);