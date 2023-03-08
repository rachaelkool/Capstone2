const Router = require("express").Router;
const router = new Router();
const StaffReports = require("../models/staff_reports");
const { ensureCorrectEmployee, ensureAdmin, ensureLoggedIn } = require("../middleware/auth");


// logged in
router.get("/:id", async function (req, res, next) {
    try {
        id = req.params.id
        const staff_report = await StaffReports.get(id);
        return res.json({ staff_report });
    } catch (err) {
        return next(err);
    }
});

// logged in
router.get("/", async function (req, res, next) {
    try {
        const staff_reports = await StaffReports.getAll();
        return res.json({ staff_reports });
    } catch (err) {
        return next(err);
    }
});

// logged in or admin/ correct user?
router.post("", async function (req, res, next) {
    try {
        const data = req.body;
        const staff_report = await StaffReports.create(data);
        return res.status(201).json({ staff_report });
    } catch (err) {
        return next(err);
    }
});

// admin or correct user
router.patch("/:id", async function (req, res, next) {
    try {
        const id = req.params.id
        const data = req.body;
        const staff_report = await StaffReports.update(id, data);
        return res.json({ staff_report });
    } catch (err) {
        return next(err);
    }
  });

// admin or correct user
router.delete("/:id", async function (req, res, next) {
    try {
        id = req.params.id
        await StaffReports.remove(id);
        return res.json({ message: "Staff report deleted" });
    } catch (err) {
        return next(err);
    }
  });


module.exports = router;