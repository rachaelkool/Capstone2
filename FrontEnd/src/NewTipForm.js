import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import DashboardApi from "./api/api";


function NewTipForm({addTip, date}) {
    const { currentEmployee } = useContext(UserContext);

    const [formData, setFormData] = useState({});

    async function handleSubmit(e) {
        e.preventDefault();
        let newTip;
        let tipData = {
            date: date,
            total_sales: formData.total_sales,
            total_tips: formData.total_tips,
            entered_by: currentEmployee.empId
        };
        addTip({...tipData, first_name: currentEmployee.firstName, last_name:currentEmployee.lastName })
        setFormData({})

        try {
            newTip = await DashboardApi.createTip(tipData);
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
                <h3>Input Tips</h3>
                <div className="field">
                    <label htmlFor="total_sales">Total Sales:</label>
                    <input
                        name="total_sales"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.total_sales}
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="total_tips">Total Tips:</label>
                    <input
                        name="total_tips"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.total_tips}
                        onChange={handleChange}
                    />
                </div>
                <button>Add</button>
                </form>
            </div>
        </div>
    );
}


export default NewTipForm;