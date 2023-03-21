import React, { useState, useContext } from "react";
import UserContext from "../UserContext";
import DashboardApi from "../api/api";


function NewStaffReportForm({addReport, date}) {
    const { currentEmployee } = useContext(UserContext);

    const [formData, setFormData] = useState({});

    async function handleSubmit(e) {
        e.preventDefault();
        let newReport;
        let reportData = {
            date: date,
            server: formData.server || null,
            section: formData.section || null,
            guests_served: formData.guests_served || null,
            total_sales: formData.total_sales || null,
            entered_by : currentEmployee.empId
        };
        addReport({...reportData})
        setFormData({
            server: '',
            section: '',
            guests_served: '',
            total_sales: ''
        })

        try {
            newReport = await DashboardApi.createStaffReport(reportData);
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
                <h3>Input Staff Report</h3>
                <div className="field">
                    <label htmlFor="server">Server:</label>
                    <input
                        name="server"
                        value={formData.server}
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="section">Section:</label>
                    <input
                        name="section"
                        value={formData.section}
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="guests_served">Guests Served:</label>
                    <input
                        name="guests_served"
                        type="number"
                        nim="0"
                        max="2000"
                        value={formData.guests_served}
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="total_sales">Total Sales:</label>
                    <input
                        name="total_sales"
                        type="number"
                        step="0.01"
                        value={formData.total_sales}
                        onChange={handleChange}
                    />
                </div>
                <button>Add Staff Report</button>
                </form>
            </div>
        </div>
    );
}


export default NewStaffReportForm;