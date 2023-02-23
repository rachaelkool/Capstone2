import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import DashboardApi from "./api/api";


function NewIncidentForm({addIncident, date}) {
    const { currentEmployee } = useContext(UserContext);

    const [formData, setFormData] = useState({
        severity: 0,
        reporting_manager: '', 
        witness: '',
        description: ''
    });

    const [formErrors, setFormErrors] = useState([]);

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
        addIncident(incidentData)
        setFormData({ 
            severity: 0,
            reporting_manager: '', 
            witness: '',
            description: ''
        })

        console.log(incidentData);

        try {
            newIncident = await DashboardApi.createIncident(incidentData);
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
                <div>
                    <label htmlFor="reporting_manager">Reporting Manager:</label>
                    <input
                        name="reporting_manager"
                        value={formData.reporting_manager}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="witness">Witness:</label>
                    <input
                        name="witness"
                        value={formData.witness}
                        onChange={handleChange}
                    />
                </div>
                <div>
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