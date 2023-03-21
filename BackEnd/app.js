const express = require('express');
const { authenticateJWT } = require("./middleware/auth");


const app = express();
const cors = require("cors");

const ExpressError = require("./expressError")

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(authenticateJWT)

const authRoutes = require("./routes/auth");
const employeesRoutes = require("./routes/employees");
const notesRoutes = require("./routes/notes");
const incidentsRoutes = require("./routes/incidents");
const attendanceRoutes = require("./routes/attendance_reports");
const tipsRoutes = require("./routes/tips");
const staffRoutes = require("./routes/staff_reports");
app.use("/auth", authRoutes);
app.use("/employees", employeesRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/incidents", incidentsRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/tips", tipsRoutes);
app.use("/api/staff", staffRoutes);


app.use(function (req, res, next) {
    const err = new ExpressError("Not Found", 404);
    return next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
        error: err.message,
    });
});


module.exports = app;