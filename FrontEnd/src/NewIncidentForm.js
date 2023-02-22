import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import DashboardApi from "./api/api";


function NewIncidentForm({addIncident, date}) {
    const { currentEmployee } = useContext(UserContext);

    const [formData, setFormData] = useState({
        description: ''
    });

    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        let newIncident;
        let incidentData = {
            date: date,
            description: formData.description,
            entered_by: currentEmployee.empId
        };
        addIncident(incidentData)
        setFormData({description:''})

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
                    <label htmlFor="description"></label>
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