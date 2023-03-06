const express = require('express');
const { authenticateJWT } = require("./middleware/auth");


const app = express();
const cors = require("cors");

const ExpressError = require("./expressError")

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(authenticateJWT)

const notesRoutes = require("./routes/notes");
const authRoutes = require("./routes/auth");
const employeesRoutes = require("./routes/employees");
const incidentsRoutes = require("./routes/incidents");
const attendanceRoutes = require("./routes/attendance_reports");
app.use("/notes", notesRoutes);
app.use("/auth", authRoutes);
app.use("/employees", employeesRoutes);
app.use("/incidents", incidentsRoutes);
app.use("/attendance", attendanceRoutes);


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