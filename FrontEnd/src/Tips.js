import React, { useState, useEffect } from "react";
import DashboardApi from "./api/api";
import { useLocation, Link } from "react-router-dom";
import NewTipForm from "./NewTipForm";


function Tips() {
    const [tips, setTips] = useState('');

    let data = useLocation();

    console.log(data);

    const addTip = (newTip) => {
        setTips(tips => [...tips, newTip]);
    };

    const removeTip = async (tip) => {
        await DashboardApi.deleteTip(tip.id);
        setTips(tips => tips.filter(t => t.total_sales !== tip.total_sales));
        // ?????
    };

    useEffect(function getTipsForDashboard() {
        async function getTips() {
            setTips(await DashboardApi.getTips());
        }
        getTips();
    }, []);

    
    if (!tips) return null;

    let todaysTips = tips.filter(tip => tip.date.includes(data.state.date))

    console.log(tips, todaysTips)

    return (
        <div>
            <div> 
                <h2>Tips from {data.state.date}</h2>
                {todaysTips.map((tip, index) => (
                    <div key={index} className="tips_wrapper" style={{display:'flex'}}>
                        <div>{tip.total_sales} {tip.percentage} {tip.total_tips}</div>
                        <button onClick={() => removeTip(tip)} className="delete">x</button>
                        <Link to={{pathname: `/tips/${tip.id}`}}>Edit</Link>  
                    </div>
                ))}
            </div>
            <br></br>
            <div>
                <NewTipForm date={data.state.date} addTip={addTip} setTips={setTips}/>
            </div>
        </div>
    );
}


export default Tips;