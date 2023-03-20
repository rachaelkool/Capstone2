import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import DashboardApi from "../api/api";


function EditAttendanceReportForm() {
    const { currentEmployee } = useContext(UserContext);
    const { id } = useParams();
    const [report, setReport] = useState('');
    const history = useHistory();

    const [formData, setFormData] = useState({});

    useEffect(function getCurrentReport() {
        async function getAttendanceReport() {
            let report = await DashboardApi.getAttendanceReport(id)
            console.log('report=', report);
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
            sick_time: formData.sick_time || false,
            tardy: formData.tardy || false,
            no_show: formData.no_show || false,
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

    function handleCheckedChange(e) {
        const { name, checked} = e.target;
        setFormData(data => ({...data, [name]: checked}))
    }

    console.log(formData);

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
                        type="checkbox"
                        checked={formData.sick_time}
                        onChange={handleCheckedChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="tardy">Tardy:</label>
                    <input
                        name="tardy"
                        checked={formData.tardy}
                        type="checkbox"
                        onChange={handleCheckedChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="no_show">No Show:</label>
                    <input
                        name="no_show"
                        type='checkbox'
                        checked={formData.no_show}
                        onChange={handleCheckedChange}
                    />
                </div>
                <button>Update</button>
                </form>
            </div>
        </div>
    );
}


export default EditAttendanceReportForm;