import React, { useState, useEffect, useContext } from "react";
import DashboardApi from "../api/api";
import { useLocation, Link } from "react-router-dom";
import NewStaffReportForm from "./NewStaffReportForm";
import UserContext from "../UserContext";


function StaffReports() {
    const { currentEmployee } = useContext(UserContext);
    const [staff_reports, setReports] = useState('');

    let data = useLocation();
    
    const addReport = (newReport) => {
        setReports(staff_reports => [...staff_reports, newReport]);
    };

    const removeReport = async (staff_report) => {
        await DashboardApi.deleteStaffReport(staff_report.id);
        setReports(staff_reports => staff_reports.filter(s => s.section !== staff_report.section));
    };

    useEffect(function getReportsForDashboard() {
        async function getStaffReports() {
            if (!DashboardApi.token) { 
                return;
            }
            setReports(await DashboardApi.getStaffReports());
        }
        getStaffReports();
    }, [DashboardApi.token]);
    
    if (!staff_reports) return null;

    let todaysReports = staff_reports.filter(staff_report => staff_report.date.includes(data.state.date))

    return (
        <div className="feature-container">
            <div> 
                <h2 className="feature-header">Staff Reports from {data.state.date}</h2>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Server</th>
                            <th>Section</th>
                            <th># of Guests Serverd</th>
                            <th>Total Sales</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {todaysReports.map((staff_report, index) => (
                        <tr key={index}>
                            <td>{staff_report.server}</td>
                            <td>{staff_report.section}</td>
                            <td>{staff_report.guests_served}</td>
                            <td>{staff_report.total_sales}</td>
                            <td>
                                {currentEmployee && (currentEmployee.empId === staff_report.entered_by) ? 
                                <Link to={{pathname: `/staff/${staff_report.id}`}}>
                                    <i className="edit icon"></i>
                                </Link> 
                                : ''}
                            </td>
                            <td>{currentEmployee && (currentEmployee.empId === staff_report.entered_by) ? <div onClick={() => removeReport(staff_report)} className="delete-row"><i className="trash alternate icon"></i></div> : ''}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>                
            </div>
            <br></br>
            <div>
                <NewStaffReportForm date={data.state.date} addReport={addReport} setReports={setReports}/>
            </div>
        </div>
    );
}


export default StaffReports;