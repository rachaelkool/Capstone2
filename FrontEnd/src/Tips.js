import React, { useState, useEffect, useContext } from "react";
import DashboardApi from "./api/api";
import { useLocation, Link } from "react-router-dom";
import NewTipForm from "./NewTipForm";
import UserContext from "./UserContext";
import './css/features.css'


function Tips() {
    const { currentEmployee } = useContext(UserContext);
    const [tips, setTips] = useState('');

    let data = useLocation();

    const addTip = (newTip) => {
        setTips(tips => [...tips, newTip]);
    };

    const removeTip = async (tip) => {
        await DashboardApi.deleteTip(tip.id);
        setTips(tips => tips.filter(t => t.total_sales !== tip.total_sales));
    };

    useEffect(function getTipsForDashboard() {
        async function getTips() {
            setTips(await DashboardApi.getTips());
        }
        getTips();
    }, []);
    
    if (!tips) return null;

    let todaysTips = tips.filter(tip => tip.date.includes(data.state.date))

    return (
        <div className="feature-container">
            <div> 
                <h2 className="feature-header">Tips from {data.state.date}</h2>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Sales</th>
                            <th>Tips</th>
                            <th>Tip Percent</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {todaysTips.map((tip, index) => (
                    <tr key={index}>
                        <td>{tip.first_name} {tip.last_name}</td>
                        <td>${tip.total_sales}</td>
                        <td>${tip.total_tips}</td>
                        <td>{Math.round((tip.total_tips / tip.total_sales) * 100)}%</td>
                        <td>
                            {currentEmployee && (currentEmployee.firstName === tip.first_name && currentEmployee.lastName === tip.last_name) ? 
                              <Link to={{pathname: `/tips/${tip.id}`}}>
                                <i className="edit icon"></i>
                            </Link> 
                          : ''}
                        </td>
                        <td>{currentEmployee && (currentEmployee.firstName === tip.first_name && currentEmployee.lastName === tip.last_name) ? <div onClick={() => removeTip(tip)} className="delete-row"><i className="trash alternate icon"></i></div> : ''}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <br></br>
            <div>
                <NewTipForm date={data.state.date} addTip={addTip} setTips={setTips}/>
            </div>
        </div>
    );
}


export default Tips;