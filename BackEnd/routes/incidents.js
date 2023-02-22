const Router = require("express").Router;
const router = new Router();
const Incidents = require("../models/incidents");
const { ensureCorrectEmployee, ensureAdmin, ensureLoggedIn } = require("../middleware/auth");


// logged in
router.get("/:id", async function (req, res, next) {
    try {
        id = req.params.id
        const incident = await Incidents.get(id);
        return res.json({ incident });
    } catch (err) {
        return next(err);
    }
});

// logged in
router.get("/", async function (req, res, next) {
    try {
        const incidents = await Incidents.getAll();
        return res.json({ incidents });
    } catch (err) {
        return next(err);
    }
});

// logged in or admin/ correct user?
router.post("", async function (req, res, next) {
    try {
        const data = req.body;
        const incident = await Incidents.create(data);
        return res.status(201).json({ incident });
    } catch (err) {
        return next(err);
    }
});

// admin or correct user
router.patch("/:id", async function (req, res, next) {
    try {
        const id = req.params.id
        const description = req.body.description
        const incident = await Incidents.update(id, description);
        return res.json({ incident });
    } catch (err) {
        return next(err);
    }
  });

// admin or correct user
router.delete("/:id", async function (req, res, next) {
    try {
        id = req.params.id
        await Incidents.remove(id);
        return res.json({ message: "Note deleted" });
    } catch (err) {
        return next(err);
    }
  });


module.exports = router;