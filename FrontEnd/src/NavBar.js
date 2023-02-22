import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "./UserContext";


function NavBar({logout}) {
    const { currentEmployee } = useContext(UserContext);

    function loggedInNavBar() {
        return (
            <div>
                <div>
                    <Link to="/">
                    Dashboard
                    </Link>
                    </div>
                <div>
                    <NavLink to="/profile">
                    Profile
                    </NavLink>
                </div>
                <div>
                    <Link to="/" onClick={logout}>
                    Log Out {currentEmployee.empId}
                    </Link>
                </div>
            </div>
        );
    }

    function loggedOutNavBar() {
        return (
            <div>
                <div>
                    <NavLink to="/login">
                    Login
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/signup">
                    Sign Up
                    </NavLink>
                </div>
            </div>
        );
    }

    return (
        <nav>
            {currentEmployee ? loggedInNavBar() : loggedOutNavBar()}
        </nav>
    );
}


export default NavBar;