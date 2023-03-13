import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "./UserContext";
import './css/navbar.css'


function NavBar({logout}) {
    const { currentEmployee } = useContext(UserContext);

    function loggedInNavBar() {
        return (
            <div className="logged-in-navbar">
                <div>
                    <Link className='logged-in-links' to="/">
                    Dashboard
                    </Link>
                </div>
                <div>
                    <NavLink className='logged-in-links' to="/profile">
                    Profile
                    </NavLink>
                </div>
                <div>
                    <Link className='logged-in-links' to="/" onClick={logout}>
                    Log Out {currentEmployee.empId}
                    </Link>
                </div>
            </div>
        );
    }

    function loggedOutNavBar() {
        return (
            <div className="logged-out-navbar">
                <div>
                    <NavLink className="logged-out-links" to="/login">
                    Login
                    </NavLink>
                </div>
                <div>
                    <NavLink className='logged-out-links' to="/signup">
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