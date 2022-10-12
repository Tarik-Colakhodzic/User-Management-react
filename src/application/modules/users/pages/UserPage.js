import { useEffect } from "react";
import { useStore } from "../../../../stores";
import { observer } from "mobx-react";
import Switch from "react-switch";
import DataTable from "react-data-table-component";

const UserPage = () => {
    const { userStore } = useStore();

    useEffect(() => {
        userStore.getUsersAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = [
        {
            key: 'FirstName',
            name: 'First name',
            selector: row => row.firstName,
            sortable: true
        },
        {
            key: 'LastName',
            name: 'Last name',
            selector: row => row.lastName,
            sortable: true
        },
        {
            key: 'Username',
            name: 'Username',
            selector: row => row.username,
            sortable: true
        },
        {
            key: 'Email',
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'status',
            selector: row => row.status ? 'Active' : 'Non active',
            sortable: true
        },
        {
            name: 'Action',
            cell: row =>
            (
                <div>
                    <button onClick={() => userStore.goToEditCreatePage(row.id)}>Edit</button>
                    <button onClick={() => userStore.confirmDeleteUser(row.id)}>Delete</button>
                    <button onClick={() => userStore.goToUserPermissionsPage(row.id)}>Assing</button>
                </div>
            )
        },
    ]

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
                    
                <DataTable
                    title="Users"
                    columns={columns}
                    data={userStore.userList}
                    pagination
                    paginationServer
                    sortServer
                    onChangePage={(page) => userStore.handlePageChange(page)}
                    onChangeRowsPerPage={(rowsPerPage) => userStore.handlePerRowsChange(rowsPerPage)}
                    paginationTotalRows={userStore.totalCount}
                    onSort={(selectedColumn, sortOrder) => userStore.handleSort(selectedColumn, sortOrder)}
                />
                }
                <button onClick={() => userStore.goToEditCreatePage()} >Create new user</button>
            </div>
        </div>
    )
}

export default observer(UserPage);