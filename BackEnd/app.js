const express = require('express');

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
const ExpressError = require("./expressError")


app.get('/', (req, res) => {
  res.send("HOMEPAGE!!")
})

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