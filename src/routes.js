import { Route, Router, Switch, Redirect } from "react-router-dom";

import { history } from "./helpers/history";

import EditCreateUserPage from "./application/modules/users/pages/EditCreateUserPage";
import UserPage from "./application/modules/users/pages/UserPage";
import UserPermissionsPage from "./application/modules/userPermissions/pages/UserPermissionsPage";

function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={UserPage} 
                />
                <Route
                    path="/editcreate/:id"
                    component={EditCreateUserPage}
                />
                <Route
                    path="/userpermissions/:id"
                    component={UserPermissionsPage}
                />
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}

export default Routes