const Router = require("express").Router;
const router = new Router();
const Incidents = require("../models/incidents");
const { ensureCorrectEmployee, ensureLoggedIn } = require("../middleware/auth");


router.get("/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        id = req.params.id
        const incident = await Incidents.get(id);
        return res.json({ incident });
    } catch (err) {
        return next(err);
    }
});

router.get("/", ensureLoggedIn, async function (req, res, next) {
    try {
        const incidents = await Incidents.getAll();
        return res.json({ incidents });
    } catch (err) {
        return next(err);
    }
});

router.post("", ensureCorrectEmployee, async function (req, res, next) {
    try {
        const data = req.body;
        const incident = await Incidents.create(data);
        return res.status(201).json({ incident });
    } catch (err) {
        return next(err);
    }
});

router.patch("/:id", ensureCorrectEmployee, async function (req, res, next) {
    try {
        const id = req.params.id
        const data = req.body;
        const incident = await Incidents.update(id, data);
        return res.json({ incident });
    } catch (err) {
        return next(err);
    }
});

router.delete("/:id", ensureCorrectEmployee, async function (req, res, next) {
    try {
        id = req.params.id
        await Incidents.remove(id);
        return res.json({ message: "Incident deleted" });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;