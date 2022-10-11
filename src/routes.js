import { Route, Router, Switch, Redirect } from "react-router-dom";

import { history } from "./helpers/history";

import EditCreateUserPage from "./application/modules/users/pages/EditCreateUserPage";
import UserPage from "./application/modules/users/pages/UserPage";

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
                    path="/editcreate"
                    component={EditCreateUserPage}
                />
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}

export default Routes