import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import Notes from "./Notes";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProtectedRoute from "./ProtectedRoute"
import EditNoteForm from "./EditNoteForm";


function Routes({ login, signup }) {
    return (
        <div>
            <Switch>
            <ProtectedRoute exact path="/">
              <Dashboard />
            </ProtectedRoute> 
            
            <Route exact path="/login">
                <LoginForm login={login} />
            </Route>

            <Route exact path="/signup">
                <SignupForm signup={signup} />
            </Route>

            <ProtectedRoute exact path="/notes">
                <Notes />
            </ProtectedRoute>

            <ProtectedRoute path="/notes/:id">
                <EditNoteForm/>
            </ProtectedRoute> 

            <Redirect to="/" />
            </Switch>
        </div>
    );
}


export default Routes;