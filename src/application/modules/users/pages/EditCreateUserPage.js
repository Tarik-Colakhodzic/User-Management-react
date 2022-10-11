import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../../../stores";
import { observer } from "mobx-react";

const EditCreateUserPage = () => {
    const { userStore } = useStore();
    let { id } = useParams();
    const isCreate = id === 'undefined';

    useEffect(() => {
        if(isCreate){
            return;
        }
        userStore.getUserByIdAsync(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <input ref={userStore.userFirstName} placeholder="First name"></input>
            <br></br>
            <input ref={userStore.userLastName} placeholder="Last name"></input>
            <br></br>
            <input ref={userStore.userEmail} placeholder="Email"></input>
            <br></br>
            <input disabled={!isCreate} ref={userStore.userUsername} placeholder="Username"></input>
            <br></br>
            <input hidden={!isCreate} ref={userStore.userPassword} placeholder="Password"></input>
            <br></br>
            <button onClick={() => userStore.saveUser(id, isCreate)} >Save</button>
        </div>
    )
}

export default observer(EditCreateUserPage);