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

    userFirstName = React.createRef('');
    userLastName = React.createRef('');
    userUsername = React.createRef('');
    userEmail = React.createRef('');
    userStatus = React.createRef(true);
    userPassword = React.createRef('');

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

    async deleteUserAsync(id) {
        var response = await this.userService.deleteAsync(id);
        console.log(response);
    }

    async getUserByIdAsync(id) {
        var response = await this.userService.getByIdAsync(id);

        this.userFirstName.current.value = response.data.firstName;
        this.userLastName.current.value = response.data.lastName;
        this.userEmail.current.value = response.data.email;
        this.userUsername.current.value = response.data.username;
    }

    async saveUser(id, isCreate) {
        var response = null;
        var model = {
            firstName: this.userFirstName.current.value,
            lastName: this.userLastName.current.value,
            email: this.userEmail.current.value,
            status: this.status
        }

        if (isCreate) {
            response = await this.userService.postAsync(Object.assign(model, { username: this.userUsername.current.value, password: this.userPassword.current.value }));
        } else {
            response = await this.userService.putAsync(id, model)
        }

        if (response.status === 200) {
            alert("Operation is successfully completed");
            this.userFirstName.current.value = '';
            this.userLastName.current.value = '';
            this.userUsername.current.value = '';
            this.userEmail.current.value = '';
            this.userPassword.current.value = '';
        }
    }

    changeStatus() {
        this.status = !this.status;
    }

    get noUsers() {
        return this.userList && this.userList.length === 0;
    };

    goToEditCreatePage(id) {
        window.location.href = '/editcreate/' + id;
    }
}

export default UserStore