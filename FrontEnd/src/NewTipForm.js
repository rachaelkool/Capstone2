import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import DashboardApi from "./api/api";


function NewTipForm({addTip, date}) {
    const { currentEmployee } = useContext(UserContext);

    const [formData, setFormData] = useState({
        total_sales: 0,
        total_tips : 0
    });

    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        let newTip;
        let tipData = {
            date: date,
            total_sales: formData.total_sales,
            total_tips: formData.total_tips,
            entered_by: currentEmployee.empId
        };
        addTip(tipData)
        setFormData({ 
            total_sales: 0,
            total_tips: 0
        })

        console.log(tipData);

        try {
            newTip = await DashboardApi.createTip(tipData);
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
                    <label htmlFor="total_sales">Total Sales:</label>
                    <input
                        name="total_sales"
                        type="number"
                        step="0.01"
                        value={formData.total_sales}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="total_tips">Total Tips:</label>
                    <input
                        name="total_tips"
                        type="number"
                        step="0.01"
                        value={formData.total_tips}
                        onChange={handleChange}
                    />
                </div>
                <button>Add Tips</button>
                </form>
            </div>
        </div>
    );
}


export default NewTipForm;