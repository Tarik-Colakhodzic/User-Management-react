import { makeAutoObservable, runInAction } from "mobx"
import React from "react";
import UserService from "../services/UserService";

class UserStore {
    userList = [];
    firstName = React.createRef('');
    lastName = React.createRef('');
    username = React.createRef('');
    email = React.createRef('');
    status = true;
    
    constructor() {
        this.userService = new UserService();
        makeAutoObservable(this);
    }

    async getUsersAsync() {
        var response = await this.userService.getAsync(
            { 
                firstName: this.firstName.current ? this.firstName.current.value : '',
                lastName: this.lastName.current ? this.lastName.current.value : '',
                username: this.username.current ? this.username.current.value : '',
                email: this.email.current ? this.email.current.value : '',
                status: this.status  
            });
        runInAction(() => {
            this.userList = response.data.items;
        })
    }

    async deleteUserAsync(id){
        var response = await this.userService.deleteAsync(id);
        console.log(response);
    }

    changeStatus(){
        this.status = !this.status;
    }

    get noUsers() {
        return this.userList && this.userList.length === 0;
    };
}

export default UserStore