import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import DashboardApi from "./api/api";


function NewAttendanceReportForm({addReport, date}) {
    const { currentEmployee } = useContext(UserContext);

    const [formData, setFormData] = useState({
        emp_id: 1000,
        sick_time: false,
        tardy: false, 
        no_show: false
    });

    const [formErrors, setFormErrors] = useState([]);

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
        console.log('reportData=', reportData);
        addReport(reportData)
        setFormData({ 
            emp_id: 1000,
            sick_time: '',
            tardy: '', 
            no_show: ''
        })

        console.log('reportdata=', reportData);

        try {
            newReport = await DashboardApi.createAttendanceReport(reportData);
        } catch (e) {
            setFormErrors(e);
        return;
        }
        
        setFormData(data => ({ ...data }));
        setFormErrors([]);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
        setFormErrors([]);
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                <div>
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
                <div>
                    <label htmlFor="sick_time">Sick Time:</label>
                    <input
                        name="sick_time"
                        type="checkbox"
                        value={formData.sick_time}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="tardy">Tardy:</label>
                    <input
                        name="tardy"
                        type="checkbox"
                        value={formData.tardy}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="no_show">No Show:</label>
                    <input
                        name="no_show"
                        type="checkbox"
                        value={formData.no_show}
                        onChange={handleChange}
                    />
                </div>
                <button>Add Employee Attendance Report</button>
                </form>
            </div>
        </div>
    );
}


export default NewAttendanceReportForm;