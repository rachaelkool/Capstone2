import React, { useState, useEffect, useContext } from "react";
import DashboardApi from "./api/api";
import { useLocation, Link } from "react-router-dom";
import NewAttendanceReportForm from "./NewAttendanceReportForm";
import UserContext from "./UserContext";


function AttendanceReports() {
    const { currentEmployee } = useContext(UserContext);
    const [attendance_reports, setReports] = useState('');

    let data = useLocation();
    
    const addReport = (newReport) => {
        setReports(attendance_reports => [...attendance_reports, newReport]);
    };

    const removeReport = async (attendance_report) => {
        await DashboardApi.deleteAttendanceReport(attendance_report.id);
        setReports(attendance_reports => attendance_reports.filter(r => r.emp_id !== attendance_report.emp_id));
    };

    useEffect(function getReportsForDashboard() {
        async function getAttendanceReports() {
            setReports(await DashboardApi.getAttendanceReports());
        }
        getAttendanceReports();
    }, []);
    
    if (!attendance_reports) return null;

    let todaysReports = attendance_reports.filter(attendance_report => attendance_report.date.includes(data.state.date))

    return (
        <div className="feature-container">
            <div> 
                <h2 className="feature-header">Employee Attendance Reports from {data.state.date}</h2>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Sick Time</th>
                            <th>Tardy</th>
                            <th>No Show</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {todaysReports.map((attendance_report, index) => (
                        <tr key={index}>
                            <td>{attendance_report.emp_id}</td>
                            <td>{attendance_report.sick_time}</td>
                            <td>{attendance_report.tardy}</td>
                            <td>{attendance_report.no_show}</td>
                            <td>
                                {currentEmployee && (currentEmployee.empId === attendance_report.entered_by) ? 
                                <Link to={{pathname: `/attendance/${attendance_report.id}`}}>
                                    <i className="edit icon"></i>
                                </Link> 
                                : ''}
                            </td>
                            <td>{currentEmployee && (currentEmployee.empId === attendance_report.entered_by) ? <div onClick={() => removeReport(attendance_report)} className="delete-row"><i className="trash alternate icon"></i></div> : ''}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <br></br>
            <div>
                <NewAttendanceReportForm date={data.state.date} addReport={addReport} setReports={setReports}/>
            </div>
        </div>
    );
}


export default AttendanceReports;