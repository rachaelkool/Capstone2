import React, { useState, useContext, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import UserContext from "./UserContext";
import DashboardApi from "./api/api";


function EditIncidentForm() {
    const { currentEmployee } = useContext(UserContext);
    const { id } = useParams();
    const [incident, setIncident] = useState('');
    const history = useHistory();

    useEffect(function getCurrentIncident() {
        async function getIncident() {
            setIncident(await DashboardApi.getIncident(id));
        }
        getIncident();
    }, [id]);

    const [formData, setFormData] = useState({
        content: ''
    });

    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        let employee_id = currentEmployee.empId;
        let updatedIncident;
        let incidentData = {
            date: incident.date,
            severity: formData.severity || incident.severity,
            reporting_manager: formData.reporting_manager || incident.reporting_manager,
            witness: formData.witness || incident.witness,
            description: formData.description || incident.description,
            entered_by: currentEmployee.empId
        };

        try {
            updatedIncident = await DashboardApi.updateIncident(id, incidentData);
            alert('updated')
            history.push("/");
        } catch (e) {
            setFormErrors(e);
            return;
        }
        
        setFormData(data => ({ ...data}));
        setFormErrors([]);
        setIncident(updatedIncident);
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
                        placeholder={incident.severity}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="reporting_manager">Reporting Manager:</label>
                    <input
                        name="reporting_manager"
                        value={formData.reporting_manager}
                        placeholder={incident.reporting_manager}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="witness">Witness:</label>
                    <input
                        name="witness"
                        value={formData.witness}
                        placeholder={incident.witness}

                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        name="description"
                        value={formData.description}
                        placeholder={incident.description}
                        onChange={handleChange}
                    />
                </div>
                <button>Update</button>
                </form>
            </div>
        </div>
    );
}


export default EditIncidentForm;