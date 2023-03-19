import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './css/features.css'


function LoginForm({ login }) {
    const history = useHistory();

    const [formData, setFormData] = useState({
        empId: "",
        password: "",
    });

    async function handleSubmit(e) {
        e.preventDefault();
        let result = await login(formData);
        if (result.success) {
            history.push("/");
        } else {
            return;
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    function handleChangeEmpId(e) {
        const { name, value } = e.target;
        if (isNaN(value)) {
            alert('Employee ID cannot contain letters.');
            return;
        }
        setFormData(data => ({ ...data, [name]: +value }));
    }

    return (
        <div className="logged-out-form">
            <div className="form">
            <h4>Log In</h4>
                <form className="ui form" onSubmit={handleSubmit}>
                    <div className="field">
                    <label htmlFor="empId">Employee ID:</label>
                    <input
                        name="empId"
                        value={formData.empId}
                        onChange={handleChangeEmpId}
                        autoComplete="empId"
                        required
                    />
                    </div>
                    <div className="field">
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
                    <br></br>
                    <button>Submit</button>
                </form>
            </div>
        </div>


    );
}


export default LoginForm;