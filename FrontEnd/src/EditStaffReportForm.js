import React, { useState, useContext, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import UserContext from "./UserContext";
import DashboardApi from "./api/api";


function EditStaffReportForm() {
    const { currentEmployee } = useContext(UserContext);
    const { id } = useParams();
    const [report, setReport] = useState('');
    const history = useHistory();

    useEffect(function getCurrentReport() {
        async function getStaffReport() {
            setReport(await DashboardApi.getStaffReport(id));
        }
        getStaffReport();
    }, [id]);

    const [formData, setFormData] = useState({
        content: ''
    });

    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        let employee_id = currentEmployee.empId;
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
            setFormErrors(e);
            return;
        }
        
        setFormData(data => ({ ...data}));
        setFormErrors([]);
        setReport(updatedReport);
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
                    <label htmlFor="server">Server:</label>
                        <input
                            name="server"
                            value={formData.server}
                            placeholder={report.server}
                            onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="section">Section:</label>
                    <input
                        name="section"
                        value={formData.section}
                        placeholder={report.section}
                        onChange={handleChange}
                    />
                </div>
                <div>
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
                <div>
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