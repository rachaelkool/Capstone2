import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import DashboardApi from "./api/api";


function EditProfileForm() {
    const { currentEmployee, setCurrentEmployee } = useContext(UserContext);

    const [formData, setFormData] = useState({
        password: "",
        firstName: "",
        lastName: ""
    });

    const [formErrors, setFormErrors] = useState([]);

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
        } catch (e) {
            setFormErrors(e);
            return;
        }
        
        setFormData(data => ({ ...data, password: "" }));
        setFormErrors([]);
        setCurrentEmployee(updatedEmployee);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
        setFormErrors([]);
    }


    return (
        <div>
            <h4>Employee Profile:</h4>
            <div>
                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        autoComplete="current-first-name"

                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        autoComplete="current-last-name"

                    />
                </div>
                <div>
                    <label htmlFor="password">Change Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                    />
                </div>
                <button>Update Profile</button>
                </form>
            </div>

        </div>
    );
}


export default EditProfileForm;