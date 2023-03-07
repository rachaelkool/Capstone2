import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import DateSelecter from "./DateSelector";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';



function Dashboard() {
    
    const [date, setDate] = useState('2023-02-22');

    const { currentEmployee } = useContext(UserContext);

    const setNewDate = (date) => {
        setDate(moment(date).format('YYYY-MM-DD'));
    }

    function loggedInDashboard() {
        console.log(date);
        return (
            <div>
                <DateSelecter setDate={setNewDate}/>
                 <p> Welcome Back, {currentEmployee.firstName}!</p>
                <Link to={{pathname: `/notes`, state: { date: date }}}>Notes</Link>
                <Link to={{pathname: `/incidents`, state: { date: date }}}>Incidents</Link>
                <Link to={{pathname: `/attendance`, state: { date: date }}}>Employee Attendance Reports</Link>
                <Link to={{pathname: `/tips`, state: { date: date }}}>Tips</Link>
            </div>
        );
    }

    function loggedOutDashboard() {
        return (
            <div>
                <p>Please log in to view dashboard.</p>
            </div>
        );
    }

    return (
        <div>
            {currentEmployee ? loggedInDashboard() : loggedOutDashboard()}
        </div>
    );
}

export default Dashboard;