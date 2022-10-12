import { makeAutoObservable, runInAction } from "mobx"
import React from "react";
import UserService from "../services/UserService";
import { confirmAlert } from 'react-confirm-alert';

class UserStore {
    userList = [];
    firstName = React.createRef('');
    lastName = React.createRef('');
    username = React.createRef('');
    email = React.createRef('');
    status = true;
    totalCount = 0;
    pageNumber = 1;
    pageSize = 10;
    sortColumn = '';
    sortDirection = '';

    userFirstName = React.createRef('');
    userLastName = React.createRef('');
    userUsername = React.createRef('');
    userEmail = React.createRef('');
    userPassword = React.createRef('');
    userStatus = true;

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
                status: this.status,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize,
                sortColumn: this.sortColumn,
                sortDirection: this.sortDirection
            });
        runInAction(() => {
            this.userList = response.data.items;
            this.totalCount = 15;
        })
    }

    confirmDeleteUser(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='modal'>
                        <div className="modal-content">
                            <h3>Confrim to complete action?</h3>
                            <p>Are you sure you want to delete this user?</p>
                            <button onClick={onClose}>No</button>
                            <button
                                onClick={() => {
                                    this.deleteUserAsync(id);
                                    onClose();
                                }}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                );
            }
        });
    }

    async deleteUserAsync(id) {
        await this.userService.deleteAsync(id)
        this.getUsersAsync();
    }

    async getUserByIdAsync(id) {
        var response = await this.userService.getByIdAsync(id);

        this.userFirstName.current.value = response.data.firstName;
        this.userLastName.current.value = response.data.lastName;
        this.userEmail.current.value = response.data.email;
        this.userStatus = response.data.status;
    }

    async saveUser(id, isCreate) {
        var model = {
            firstName: this.userFirstName.current.value,
            lastName: this.userLastName.current.value,
            email: this.userEmail.current.value,
            status: this.userStatus
        }

        if (isCreate) {
            await this.userService.postAsync(Object.assign(model, { username: this.userUsername.current.value, password: this.userPassword.current.value }));
        } else {
            await this.userService.putAsync(id, model)
        }

        alert("Operation is successfully completed");
        this.userFirstName.current.value = '';
        this.userLastName.current.value = '';
        this.userEmail.current.value = '';
        this.userPassword.current.value = '';
        if (this.userUsername.current) {
            this.userUsername.current.value = '';
        }
        this.status = true;
    }

    changeStatus() {
        this.status = !this.status;
    }

    changeUserStatus() {
        this.userStatus = !this.userStatus;
    }

    get noUsers() {
        return this.userList && this.userList.length === 0;
    };

    goToEditCreatePage(id) {
        window.location.href = '/editcreate/' + id;
    }

    goToUserPermissionsPage(id) {
        window.location.href = '/userpermissions/' + id
    }

    async handlePageChange(page) {
        this.pageNumber = page
        await this.getUsersAsync();
    }

    async handlePerRowsChange(pageSize) {
        this.pageSize = pageSize;
        await this.getUsersAsync();
    }

    async handleSort(selectedColumn, sortOrder){
        this.sortColumn = selectedColumn.key;
        this.sortDirection = sortOrder;
        await this.getUsersAsync();
    }
}

export default UserStore