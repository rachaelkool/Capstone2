import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import Notes from "./Notes";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";


function Routes({ login, signup }) {

    return (
        <div>
            <Switch>
            <Route exact path="/">
                <Dashboard />
            </Route>

            <Route exact path="/login">
                <LoginForm login={login} />
            </Route>

            <Route exact path="/signup">
                <SignupForm signup={signup} />
            </Route>

            <Route exact path="/notes">
                <Notes />
            </Route>

            <Redirect to="/" />
            </Switch>
        </div>
    );
}


export default Routes;