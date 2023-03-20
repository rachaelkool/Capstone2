import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import DashboardApi from "../api/api";


function EditTipForm() {
    const { currentEmployee } = useContext(UserContext);
    const { id } = useParams();
    const [tip, setTip] = useState('');
    const history = useHistory();

    const [formData, setFormData] = useState({});

    useEffect(function getCurrentTip() {
        async function getTip() {
            let tip = await DashboardApi.getTip(id)
            setTip(tip);
            setFormData(tip)
        }
        getTip();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        let updatedTip;
        let tipData = {
            date: tip.date,
            total_sales: formData.total_sales || tip.total_sales,
            total_tips: formData.total_tips || tip.total_tips,
            entered_by: currentEmployee.empId
        };

        try {
            updatedTip = await DashboardApi.updateTip(id, tipData);
            alert('updated')
            history.push("/");
        } catch (e) {
            return;
        }
        
        setFormData(data => ({ ...data}));
        setTip(updatedTip);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <div className="feature-container">
            <h3>Input Tips</h3>
            <div className="form">
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="total_sales">Total Sales:</label>
                    <input
                        name="total_sales"
                        type="number"
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
                        step="0.01"
                        value={formData.total_tips}
                        onChange={handleChange}
                    />
                </div>
                <button>Update</button>
                </form>
            </div>
        </div>
    );
}


export default EditTipForm;