import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import DashboardApi from "../api/api";


function EditStaffReportForm() {
    const { currentEmployee } = useContext(UserContext);
    const { id } = useParams();
    const [report, setReport] = useState('');
    const history = useHistory();

    const [formData, setFormData] = useState({});

    useEffect(function getCurrentReport() {
        async function getStaffReport() {
            let report = await DashboardApi.getStaffReport(id)
            setReport(report);
            setFormData(report)
        }
        getStaffReport();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        let updatedReport;
        let reportData = {
            date: report.date,
            server: formData.server || report.server,
            section: formData.section || report.section,
            guests_served: formData.guests_served || report.guests_served,
            total_sales: formData.total_sales || report.total_sales,
            entered_by: currentEmployee.empId
        };

        try {
            updatedReport = await DashboardApi.updateStaffReport(id, reportData);
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
            <h3>Input Staff Report</h3>
            <div className="form">
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="server">Server:</label>
                        <input
                            name="server"
                            value={formData.server}
                            placeholder={report.server}
                            onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="section">Section:</label>
                    <input
                        name="section"
                        value={formData.section}
                        placeholder={report.section}
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="guests_served">Guests Served:</label>
                    <input
                        name="guests_served"
                        type="number"
                        min="0"
                        max="2000"
                        value={formData.guests_served}
                        placeholder={report.guests_served}
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
                        placeholder={report.total_sales}

                        onChange={handleChange}
                    />
                </div>
                <button>Update</button>
                </form>
            </div>
        </div>
    );
}


export default EditStaffReportForm;