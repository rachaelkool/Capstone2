import React from "react";
import Notes from "./Notes";
import { Link } from "react-router-dom";


function Dashboard() {

    return (
        <div>
            <h2>Welcome to the Dashboard!</h2>
            <Link to={`/notes`}>View All</Link>
            <Notes />
        </div>
    );
}

export default Dashboard;