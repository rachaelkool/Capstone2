import React, { useState, useEffect } from "react";
import DashboardApi from "./api/api";
import { useLocation, Link } from "react-router-dom";
import NewStaffReportForm from "./NewStaffReportForm";


function StaffReports() {
    const [staff_reports, setReports] = useState('');

    let data = useLocation();

    console.log(data)
    
    const addReport = (newReport) => {
        setReports(staff_reports => [...staff_reports, newReport]);
    };

    const removeReport = async (staff_report) => {
        await DashboardApi.deleteStaffReport(staff_report.id);
        setReports(staff_reports => staff_reports.filter(s => s.section !== staff_report.section));
    };

    useEffect(function getReportsForDashboard() {
        async function getStaffReports() {
            setReports(await DashboardApi.getStaffReports());
        }
        getStaffReports();
    }, []);
    
    if (!staff_reports) return null;

    let todaysReports = staff_reports.filter(staff_report => staff_report.date.includes(data.state.date))

    console.log(staff_reports)

    return (
        <div>
            <div> 
                <h2>Staff Reports from {data.state.date}</h2>
                {todaysReports.map((staff_report, index) => (
                    <div key={index} className="staff_reports_wrapper" style={{display:'flex'}}>
                        <div>{staff_report.server} {staff_report.section} {staff_report.guests_served} {staff_report.total_sales}</div>
                        <button onClick={() => removeReport(staff_report)} className="delete">x</button>
                        <Link to={{pathname: `/staff/${staff_report.id}`}}>Edit</Link>  
                    </div>
                ))}
            </div>
            <br></br>
            <div>
                <NewStaffReportForm date={data.state.date} addReport={addReport} setReports={setReports}/>
            </div>
        </div>
    );
}


export default StaffReports;