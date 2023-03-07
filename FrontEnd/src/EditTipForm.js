import React, { useState, useContext, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import UserContext from "./UserContext";
import DashboardApi from "./api/api";


function EditTipForm() {
    const { currentEmployee } = useContext(UserContext);
    const { id } = useParams();
    const [tip, setTip] = useState('');
    const history = useHistory();

    useEffect(function getCurrentTip() {
        async function getTip() {
            setTip(await DashboardApi.getTip(id));
        }
        getTip();
    }, [id]);

    const [formData, setFormData] = useState({
        content: ''
    });

    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        let employee_id = currentEmployee.empId;
        let updatedTip;
        let tipData = {
            date: tip.date,
            total_sales: formData.total_sales || tip.total_sales,
            tip_percentage: formData.tip_percentage || tip.tip_percentage,
            total_tips: formData.total_tips || tip.total_tips,
            entered_by: currentEmployee.empId
        };

        try {
            updatedTip = await DashboardApi.updateTip(id, tipData);
            alert('updated')
            history.push("/");
        } catch (e) {
            setFormErrors(e);
            return;
        }
        
        setFormData(data => ({ ...data}));
        setFormErrors([]);
        setTip(updatedTip);
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
                        placeholder={tip.total_sales}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="tip_percentage">Tip Percentage:</label>
                    <input
                        name="tip_percentage"
                        type="number"
                        step="0.01"
                        value={formData.tip_percentage}
                        placeholder={tip.tip_percentage}
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
                        placeholder={tip.total_tips}
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