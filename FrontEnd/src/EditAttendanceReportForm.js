import React, { useState, useContext, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import UserContext from "./UserContext";
import DashboardApi from "./api/api";


function EditAttendanceReportForm() {
    const { currentEmployee } = useContext(UserContext);
    const { id } = useParams();
    const [report, setReport] = useState('');
    const history = useHistory();

    const [formData, setFormData] = useState({});

    useEffect(function getCurrentReport() {
        async function getAttendanceReport() {
            let report = await DashboardApi.getAttendanceReport(id)
            setReport(report);
            setFormData(report)
        }
        getAttendanceReport();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        let updatedReport;
        let reportData = {
            date: report.date,
            emp_id: formData.emp_id || report.emp_id,
            sick_time: formData.sick_time || report.sick_time,
            tardy: formData.tardy || report.tardy,
            no_show: formData.no_show || report.no_show,
            entered_by: currentEmployee.empId
        };

        try {
            updatedReport = await DashboardApi.updateAttendanceReport(id, reportData);
            alert('updated')
            history.push("/");
        } catch (e) {
            return;
        }
        
        setFormData(data => ({ ...data}));
        setReport(updatedReport);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <div className="feature-container">
            <h3>Input Attendance</h3>
            <div className="form">
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="emp_id">Employee ID:</label>
                        <input
                            name="emp_id"
                            type="number"
                            min="0"
                            max="3000"
                            value={formData.emp_id}
                            placeholder={report.emp_id}
                            onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="sick_time">Sick Time:</label>
                    <input
                        name="sick_time"
                        value={formData.sick_time}
                        placeholder={report.sick_time}
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="tardy">Tardy:</label>
                    <input
                        name="tardy"
                        value={formData.tardy}
                        placeholder={report.tardy}
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="no_show">No Show:</label>
                    <input
                        name="no_show"
                        value={formData.no_show}
                        placeholder={report.no_show}

                        onChange={handleChange}
                    />
                </div>
                <button>Update</button>
                </form>
            </div>
        </div>
    );
}


export default EditAttendanceReportForm;