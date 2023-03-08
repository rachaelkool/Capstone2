import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import Notes from "./Notes";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProtectedRoute from "./ProtectedRoute"
import Incidents from "./Incidents";
import EditProfileForm from "./EditProfileForm";
import EditNoteForm from "./EditNoteForm";
import EditIncidentForm from "./EditIncidentForm";
import AttendanceReports from "./AttendanceReports";
import EditAttendanceReportForm from "./EditAttendanceReportForm";
import Tips from "./Tips";
import EditTipForm from "./EditTipForm";
import StaffReports from "./StaffReports";
import EditStaffReportForm from "./EditStaffReportForm";


function Routes({ login, signup }) {
    return (
        <div>
            <Switch>
            <ProtectedRoute exact path="/">
              <Dashboard />
            </ProtectedRoute> 
            
            <Route exact path="/login">
                <LoginForm login={login} />
            </Route>

            <Route exact path="/signup">
                <SignupForm signup={signup} />
            </Route>

            <ProtectedRoute exact path="/notes">
                <Notes />
            </ProtectedRoute>

            <ProtectedRoute exact path="/notes/:id">
                <EditNoteForm />
            </ProtectedRoute>

            <ProtectedRoute exact path="/incidents">
                <Incidents />
            </ProtectedRoute>

            <ProtectedRoute exact path="/incidents/:id">
                <EditIncidentForm />
            </ProtectedRoute>

            <ProtectedRoute exact path="/attendance">
                <AttendanceReports />
            </ProtectedRoute>

            <ProtectedRoute exact path="/attendance/:id">
                <EditAttendanceReportForm />
            </ProtectedRoute>

            <ProtectedRoute exact path="/tips">
                <Tips />
            </ProtectedRoute>

            <ProtectedRoute exact path="/tips/:id">
                <EditTipForm />
            </ProtectedRoute>

            <ProtectedRoute exact path="/staff">
                <StaffReports />
            </ProtectedRoute>

            <ProtectedRoute exact path="/staff/:id">
                <EditStaffReportForm />
            </ProtectedRoute>

            <ProtectedRoute path="/profile">
                <EditProfileForm/>
            </ProtectedRoute>

            <Redirect to="/" />
            </Switch>
        </div>
    );
}


export default Routes;