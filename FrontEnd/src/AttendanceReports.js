import React, { useState, useEffect } from "react";
import DashboardApi from "./api/api";
import { useLocation, Link } from "react-router-dom";
import NewAttendanceReportForm from "./NewAttendanceReportForm";


function AttendanceReports() {
    const [attendance_reports, setReports] = useState('');

    let data = useLocation();

    console.log(data)
    
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

    console.log(attendance_reports)

    return (
        <div>
            <div> 
                <h2>Employee Attendance Reports from {data.state.date}</h2>
                {todaysReports.map((attendance_report, index) => (
                    <div key={index} className="attendance_reports_wrapper" style={{display:'flex'}}>
                        <div>{attendance_report.emp_id} {attendance_report.sick_time} {attendance_report.tardy} {attendance_report.no_show}</div>
                        <button onClick={() => removeReport(attendance_report)} className="delete">x</button>
                        <Link to={{pathname: `/attendance/${attendance_report.id}`}}>Edit</Link>  
                    </div>
                ))}
            </div>
            <br></br>
            <div>
                <NewAttendanceReportForm date={data.state.date} addReport={addReport} setReports={setReports}/>
            </div>
        </div>
    );
}


export default AttendanceReports;