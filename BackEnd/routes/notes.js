const Router = require("express").Router;
const router = new Router();
const Notes = require("../models/notes");
const { ensureCorrectEmployee, ensureAdmin, ensureLoggedIn } = require("../middleware/auth");


// logged in
router.get("/:id", async function (req, res, next) {
    try {
        id = req.params.id
        const note = await Notes.get(id);
        return res.json({ note });
    } catch (err) {
        return next(err);
    }
});

// logged in
router.get("/", async function (req, res, next) {
    try {
        const notes = await Notes.getAll();
        return res.json({ notes });
    } catch (err) {
        return next(err);
    }
});

// logged in or admin/ correct user?
router.post("", async function (req, res, next) {
    try {
        const data = req.body;
        const note = await Notes.create(data);
        return res.status(201).json({ note });
    } catch (err) {
        return next(err);
    }
});

// admin or correct user
router.patch("/:id", async function (req, res, next) {
    try {
        const id = req.params.id
        const content = req.body.content
        const note = await Notes.update(id, content);
        return res.json({ note });
    } catch (err) {
        return next(err);
    }
  });

// admin or correct user
router.delete("/:id", async function (req, res, next) {
    try {
        id = req.params.id
        await Notes.remove(id);
        return res.json({ message: "Note deleted" });
    } catch (err) {
        return next(err);
    }
  });


module.exports = router;