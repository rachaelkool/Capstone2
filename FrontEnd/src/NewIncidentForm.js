import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import DashboardApi from "./api/api";


function NewIncidentForm({addIncident, date}) {
    const { currentEmployee } = useContext(UserContext);

    const [formData, setFormData] = useState({});

    async function handleSubmit(e) {
        e.preventDefault();
        let newIncident;
        let incidentData = {
            date: date,
            severity: formData.severity,
            reporting_manager: formData.reporting_manager || null,
            witness: formData.witness || null,
            description: formData.description,
            entered_by: currentEmployee.empId
        };
        addIncident({...incidentData, first_name: currentEmployee.firstName, last_name:currentEmployee.lastName})
        setFormData({})

        try {
            newIncident = await DashboardApi.createIncident(incidentData);
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
                <h3>Input Incident</h3>
                <div className="field">
                    <label htmlFor="severity">Severity (0-5):</label>
                    <input
                        name="severity"
                        type="number"
                        min="0"
                        max="5"
                        value={formData.severity}
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="reporting_manager">Reporting Manager:</label>
                    <input
                        name="reporting_manager"
                        value={formData.reporting_manager}
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="witness">Witness:</label>
                    <input
                        name="witness"
                        value={formData.witness}
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="description">Description:</label>
                    <input
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <button>Add Incident</button>
                </form>
            </div>
        </div>
    );
}


export default NewIncidentForm;