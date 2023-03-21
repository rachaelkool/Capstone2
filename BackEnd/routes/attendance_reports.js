const Router = require("express").Router;
const router = new Router();
const AttendanceReports = require("../models/attendance_reports");
const { ensureCorrectEmployee, ensureLoggedIn } = require("../middleware/auth");


router.get("/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        id = req.params.id
        const attendance_report = await AttendanceReports.get(id);
        return res.json({ attendance_report });
    } catch (err) {
        return next(err);
    }
});

router.get("/", ensureLoggedIn, async function (req, res, next) {
    try {
        const attendance_reports = await AttendanceReports.getAll();
        return res.json({ attendance_reports });
    } catch (err) {
        return next(err);
    }
});

router.post("", ensureCorrectEmployee, async function (req, res, next) {
    try {
        const data = req.body;
        const attendance_report = await AttendanceReports.create(data);
        return res.status(201).json({ attendance_report });
    } catch (err) {
        return next(err);
    }
});

router.patch("/:id", ensureCorrectEmployee, async function (req, res, next) {
    try {
        const id = req.params.id
        const data = req.body;
        const attendance_report = await AttendanceReports.update(id, data);
        return res.json({ attendance_report });
    } catch (err) {
        return next(err);
    }
});

router.delete("/:id", ensureCorrectEmployee, async function (req, res, next) {
    try {
        id = req.params.id
        await AttendanceReports.remove(id);
        return res.json({ message: "Employee attendance report deleted" });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;