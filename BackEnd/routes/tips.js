const Router = require("express").Router;
const router = new Router();
const Tips = require("../models/tips");
const { ensureCorrectEmployee, ensureAdmin, ensureLoggedIn } = require("../middleware/auth");


// logged in
router.get("/:id", async function (req, res, next) {
    try {
        id = req.params.id
        const tip = await Tips.get(id);
        return res.json({ tip });
    } catch (err) {
        return next(err);
    }
});

// logged in
router.get("/", async function (req, res, next) {
    try {
        const tips = await Tips.getAll();
        return res.json({ tips });
    } catch (err) {
        return next(err);
    }
});

// logged in or admin/ correct user?
router.post("", async function (req, res, next) {
    try {
        const data = req.body;
        const tip = await Tips.create(data);
        return res.status(201).json({ tip });
    } catch (err) {
        return next(err);
    }
});

// admin or correct user
router.patch("/:id", async function (req, res, next) {
    try {
        const id = req.params.id
        const data = req.body;
        const tip = await Tips.update(id, data);
        return res.json({ tip });
    } catch (err) {
        return next(err);
    }
  });

// admin or correct user
router.delete("/:id", async function (req, res, next) {
    try {
        id = req.params.id
        await Tips.remove(id);
        return res.json({ message: "Tip deleted" });
    } catch (err) {
        return next(err);
    }
  });


module.exports = router;