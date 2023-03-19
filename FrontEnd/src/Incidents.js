import React, { useState, useContext, useEffect } from "react";
import DashboardApi from "./api/api";
import { useLocation, Link } from "react-router-dom";
import NewIncidentForm from "./NewIncidentForm";
import UserContext from "./UserContext";


function Incidents() {
    const { currentEmployee } = useContext(UserContext);
    const [incidents, setIncidents] = useState('');

    let data = useLocation();

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

    return (
        <div className="feature-container">
            <div> 
                <h2 className="feature-header">Incidents from {data.state.date}</h2>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Severity</th>
                            <th>Reporting Manager</th>
                            <th>Witness</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {todaysIncidents.map((incident, index) => (
                        <tr key={index}>
                            <td>{incident.first_name} {incident.last_name}</td>
                            <td>{incident.description}</td>
                            <td>{incident.severity}</td>
                            <td>{incident.reporting_manager}</td>
                            <td>{incident.witness}</td>
                            <td>
                                {currentEmployee && (currentEmployee.firstName === incident.first_name && currentEmployee.lastName === incident.last_name) ? 
                                <Link to={{pathname: `/incidents/${incident.id}`}}>
                                    <i className="edit icon"></i>
                                </Link> 
                                : ''}
                            </td>
                            <td>{currentEmployee && (currentEmployee.firstName === incident.first_name && currentEmployee.lastName === incident.last_name) ? <div onClick={() => removeIncident(incident)} className="delete-row"><i className="trash alternate icon"></i></div> : ''}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <br></br>
            <div>
                <NewIncidentForm date={data.state.date} addIncident={addIncident} setIncidents={setIncidents}/>
            </div>
        </div>
    );
}


export default Incidents;