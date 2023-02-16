import React, { useState } from "react";
import { useHistory } from "react-router-dom";


function LoginForm({ login }) {
    const history = useHistory();

    const [formData, setFormData] = useState({
        empId: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        let result = await login(formData);
        if (result.success) {
        history.push("/");
        } else {
        setFormErrors(result.errors);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <div>
            <h4>Log In</h4>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="empId">Employee ID:</label>
                <input
                    name="empId"
                    value={formData.empId}
                    onChange={handleChange}
                    autoComplete="empId"
                    required
                />
                </div>
                <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                />
                </div>
                <button>Submit</button>
            </form>
            <p>{formErrors}</p>
        </div>


    );
}


export default LoginForm;