import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "./UserContext";


function ProtectedRoute({ exact, path, children }) {
    const { currentUser } = useContext(UserContext);

    if (currentUser === null) {
        return <Redirect to="/" />;
    }

    return (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );
}


export default ProtectedRoute;