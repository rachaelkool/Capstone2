import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Dashboard from "./Dashboard";
import EditProfileForm from "./EditProfileForm";
import Notes from "./Notes/Notes";
import EditNoteForm from "./Notes/EditNoteForm";
import Incidents from "./Incidents/Incidents";
import EditIncidentForm from "./Incidents/EditIncidentForm";
import Tips from "./Tips/Tips";
import EditTipForm from "./Tips/EditTipForm";
import StaffReports from "./StaffReports/StaffReports";
import EditStaffReportForm from "./StaffReports/EditStaffReportForm";
import AttendanceReports from "./EmployeeAttendanceReports/AttendanceReports";
import EditAttendanceReportForm from "./EmployeeAttendanceReports/EditAttendanceReportForm";


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