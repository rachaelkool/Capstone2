const Router = require("express").Router;
const router = new Router();
const AttendanceReports = require("../models/attendance_reports");
const { ensureCorrectEmployee, ensureAdmin, ensureLoggedIn } = require("../middleware/auth");


// logged in
router.get("/:id", async function (req, res, next) {
    try {
        id = req.params.id
        const attendance_report = await AttendanceReports.get(id);
        return res.json({ attendance_report });
    } catch (err) {
        return next(err);
    }
});

// logged in
router.get("/", async function (req, res, next) {
    try {
        const attendance_reports = await AttendanceReports.getAll();
        return res.json({ attendance_reports });
    } catch (err) {
        return next(err);
    }
});

// logged in or admin/ correct user?
router.post("", async function (req, res, next) {
    try {
        const data = req.body;
        const attendance_report = await AttendanceReports.create(data);
        return res.status(201).json({ attendance_report });
    } catch (err) {
        return next(err);
    }
});

// admin or correct user
router.patch("/:id", async function (req, res, next) {
    try {
        const id = req.params.id
        const data = req.body;
        const attendance_report = await AttendanceReports.update(id, data);
        return res.json({ attendance_report });
    } catch (err) {
        return next(err);
    }
  });

// admin or correct user
router.delete("/:id", async function (req, res, next) {
    try {
        id = req.params.id
        await AttendanceReports.remove(id);
        return res.json({ message: "Employee attendance report deleted" });
    } catch (err) {
        return next(err);
    }
  });


module.exports = router;