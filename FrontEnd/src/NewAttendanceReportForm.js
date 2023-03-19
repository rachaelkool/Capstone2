import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import DashboardApi from "./api/api";


function NewAttendanceReportForm({addReport, date}) {
    const { currentEmployee } = useContext(UserContext);

    const [formData, setFormData] = useState({});

    async function handleSubmit(e) {
        e.preventDefault();
        let newReport;
        let reportData = {
            date: date,
            emp_id: formData.emp_id,
            sick_time: formData.sick_time || null,
            tardy: formData.tardy || null,
            no_show: formData.no_show || null,
            entered_by: currentEmployee.empId
        };
        addReport({...reportData})
        setFormData({})

        try {
            newReport = await DashboardApi.createAttendanceReport(reportData);
        } catch (e) {
            return;
        }
        
        setFormData(data => ({ ...data }));
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <div>
            <div className='form'>
                <form className="ui form" onSubmit={handleSubmit}>
                <h3>Input Attendance</h3>
                <div className="field">
                    <label htmlFor="emp_id">Employee ID:</label>
                    <input
                        name="emp_id"
                        type="number"
                        min="0"
                        max="3000"
                        value={formData.emp_id}
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="sick_time">Sick Time:</label>
                    <input
                        name="sick_time"
                        type="checkbox"
                        value={formData.sick_time}
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="tardy">Tardy:</label>
                    <input
                        name="tardy"
                        type="checkbox"
                        value={formData.tardy}
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="no_show">No Show:</label>
                    <input
                        name="no_show"
                        type="checkbox"
                        value={formData.no_show}
                        onChange={handleChange}
                    />
                </div>
                <button>Add Attendance</button>
                </form>
            </div>
        </div>
    );
}


export default NewAttendanceReportForm;