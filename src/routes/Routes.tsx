import React, {ReactElement} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Authentication from "../pages/Authentication";
import Cms from "../cms/components";
import PrivateRoute from "./PrivateRoute";
import useIsLoggedIn from "../utils/useIsLoggedIn";
import Profile from "../pages/Profile";


interface Props {};

function Routes(props:Props):ReactElement {
    const isLoggedIn = useIsLoggedIn();
    return (
        <Router>
            <Switch>
                <Route exact path="/login">
                    <Authentication />
                </Route>
                <PrivateRoute exact path="/" authenticationPath={"/login"} isAuthenticated={isLoggedIn}>
                    <Cms {...props} />
                </PrivateRoute>
                <PrivateRoute exact path="/profile" authenticationPath={"/login"} isAuthenticated={isLoggedIn}>
                    <Profile/>
                </PrivateRoute>
                {/*<Redirect from="*" to="/" />*/}
            </Switch>
        </Router>
    );
}
export default Routes;
