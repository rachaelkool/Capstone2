import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';
import useLocalStorage from './hooks/useLocalStorage';
import DashboardApi from './api/api';
import jwt from "jsonwebtoken";
import UserContext from './UserContext';
import NavBar from './NavBar';

export const TOKEN_STORAGE_ID = "dashboard-token";


function App() {
    const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
    const [currentEmployee, setCurrentEmployee] = useState(null);

    async function login(loginData) {
        try {
            let token = await DashboardApi.login(loginData);
            setToken(token);
            return { success: true };
        } catch (e) {
            console.error("login failed", e);
          return { success: false, e };
        }
    }

    async function signup(signupData) {
        try {
            let token = await DashboardApi.signup(signupData);
            setToken(token);
            return { success: true };
        } catch (e) {
            console.error("signup failed", e);
            return { success: false, e };
        }
    }

    useEffect(function loadEmployeeInfo() {  
        async function getCurrentEmployee() {
            if (token) {
                try {
                    let { empId } = jwt.decode(token);
                    DashboardApi.token = token;
                    let currentEmployee = await DashboardApi.getCurrentEmployee(empId);
                    setCurrentEmployee(currentEmployee);
                } catch (e) {
                    console.error("loadEmployeeInfo: problem loading", e);
                    setCurrentEmployee({});
                }
            }
        }
        getCurrentEmployee();
    }, [token]);

    function logout() {
        setCurrentEmployee(null);
        setToken(null);
    }

    return (
        <div>
            <BrowserRouter>
                <UserContext.Provider value={{ currentEmployee, setCurrentEmployee }}>
                    <NavBar logout={logout}/>
                    <Routes login={login} signup={signup}/>
                </UserContext.Provider>
          </BrowserRouter>
        </div>
    );
}


export default App;
