const Router = require("express").Router;
const router = new Router();
const Notes = require("../models/notes");
const { ensureCorrectEmployee, ensureLoggedIn } = require("../middleware/auth");


router.get("/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        id = req.params.id
        const note = await Notes.get(id);
        return res.json({ note });
    } catch (err) {
        return next(err);
    }
});

router.get("/", ensureLoggedIn, async function (req, res, next) {
    try {
        const notes = await Notes.getAll();
        return res.json({ notes });
    } catch (err) {
        return next(err);
    }
});

router.post("", ensureCorrectEmployee, async function (req, res, next) {
    try {
        const data = req.body;
        const note = await Notes.create(data);
        return res.status(201).json({ note });
    } catch (err) {
        return next(err);
    }
});

router.patch("/:id", ensureCorrectEmployee, async function (req, res, next) {
    try {
        const id = req.params.id
        const content = req.body.content
        const note = await Notes.update(id, content);
        return res.json({ note });
    } catch (err) {
        return next(err);
    }
});

router.delete("/:id", ensureCorrectEmployee, async function (req, res, next) {
    try {
        id = req.params.id
        await Notes.remove(id);
        return res.json({ message: "Note deleted" });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;