import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "./UserContext";
import DashboardApi from "./api/api";
import './css/features.css'


function EditProfileForm() {
    const { currentEmployee, setCurrentEmployee } = useContext(UserContext);
    const history = useHistory();

    const [formData, setFormData] = useState({
        password: "",
        firstName: currentEmployee.firstName,
        lastName: currentEmployee.lastName
    });

    async function handleSubmit(e) {
        e.preventDefault();
        let employee_id = currentEmployee.empId;
        let updatedEmployee;
        let profileData = {
            password: formData.password || currentEmployee.password,
            firstName: formData.firstName || currentEmployee.firstName,
            lastName: formData.lastName || currentEmployee.lastName,
        };

        try {
            updatedEmployee = await DashboardApi.updateProfile(employee_id, profileData);
            alert('updated')
            history.push("/");
        } catch (e) {
            return;
        }
        
        setFormData(data => ({ ...data, password: "" }));
        setCurrentEmployee(updatedEmployee);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <div className="feature-container">
            <h3>Employee Profile</h3>
            <div className="form">
                <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        autoComplete="current-last-name"

                    />
                </div>
                <div className="field">
                    <label htmlFor="password">Change Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                    />
                </div>
                <button>Update</button>
                </form>
            </div>

        </div>
    );
}


export default EditProfileForm;