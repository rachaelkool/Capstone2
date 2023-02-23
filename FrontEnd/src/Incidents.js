import React, { useState, useEffect } from "react";
import DashboardApi from "./api/api";
import { useLocation } from "react-router-dom";
import NewIncidentForm from "./NewIncidentForm";


function Incidents() {
    const [incidents, setIncidents] = useState('');

    let data = useLocation();

    console.log(data);

    const addIncident = (newIncident) => {
        setIncidents(incidents => [...incidents, newIncident]);
    };

    const removeIncident = async (incident) => {
        await DashboardApi.deleteIncident(incident.id);
        setIncidents(incidents => incidents.filter(i => i.description !== incident.description));
    };

    useEffect(function getIncidentsForDashboard() {
        async function getIncidents() {
            setIncidents(await DashboardApi.getIncidents());
        }
        getIncidents();
    }, []);

    
    if (!incidents) return null;

    let todaysIncidents = incidents.filter(incident => incident.date.includes(data.state.date))

    console.log(incidents, todaysIncidents)

    return (
        <div>
            <div> 
                <h2>Incidents from {data.state.date}</h2>
                {todaysIncidents.map((incident, index) => (
                    <div key={index} className="incidents_wrapper" style={{display:'flex'}}>
                        <div>{incident.severity} {incident.description}</div>
                        <button onClick={() => removeIncident(incident)} className="delete">x</button>
                    </div>
                ))}
            </div>
            <br></br>
            <div>
                <NewIncidentForm date={data.state.date} addIncident={addIncident} setIncidents={setIncidents}/>
            </div>
        </div>
    );
}


export default Incidents;