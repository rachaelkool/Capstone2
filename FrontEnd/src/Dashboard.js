import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import DateSelecter from "./DateSelector";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import './css/dashboard.css'



function Dashboard() {
    
    const [date, setDate] = useState('2023-02-22');

    const { currentEmployee } = useContext(UserContext);

    const setNewDate = (date) => {
        setDate(moment(date).format('YYYY-MM-DD'));
    }

    function loggedInDashboard() {
        console.log(date);
        return (
            <div className="dashboard-container">
                <div className="date-header">
                <p className="welcome-header"> Welcome Back, {currentEmployee.firstName}!</p>
                    <div className="date-container">
                        Viewing and creating data for the work day of {date}
                        <div className="date-selector">
                        <DateSelecter setDate={setNewDate}/>
                        </div>
                    </div>
                </div>

                <div className="links-container">
                    <Link className="link-tile" to={{pathname: `/notes`, state: { date: date }}}>
                        <div className="link-text">
                            Notes
                        </div>
                        <img className="link-image" src='https://cdn3.vectorstock.com/i/1000x1000/35/27/writing-notebook-icon-outline-style-vector-28763527.jpg' />
                    </Link>
                    <Link className="link-tile" to={{pathname: `/incidents`, state: { date: date }}}>
                        <div className="link-text">
                            Incidents
                        </div>
                        <img className="link-image" src="https://www.fife.gov.uk/__data/assets/image/0033/81798/alert_icon.png" />
                    </Link>
                    <Link className="link-tile" to={{pathname: `/attendance`, state: { date: date }}}>
                        <div className="link-text">
                            Employee Attendance
                        </div>
                        <img className="link-image" src="https://icons.veryicon.com/png/o/miscellaneous/effevo/attendance-1.png" />
                    </Link>
                    <Link className="link-tile" to={{pathname: `/tips`, state: { date: date }}}>
                        <div className="link-text">
                            Sales and Tips
                        </div>
                        <img className="link-image" src='https://previews.123rf.com/images/briang77/briang771512/briang77151200839/49668279-dollar-sign-vector-icon.jpg' />
                    </Link>
                    <Link className="link-tile" to={{pathname: `/staff`, state: { date: date }}}>
                        <div className="link-text">
                            Staff Report
                        </div>
                        <img className="link-image" src="https://icon-library.com/images/waiter-icon-png/waiter-icon-png-16.jpg" />
                    </Link>
                </div>
            </div>
        );
    }

    function loggedOutDashboard() {
        return (
            <div className="logged-out-dash">
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