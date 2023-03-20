const jwt = require("jsonwebtoken");
const ExpressError = require("../expressError");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";


function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader;
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
}

function ensureLoggedIn(req, res, next) {
  try {
    console.log(res.locals.user)
    if (!res.locals.user) throw new ExpressError();
    return next();
  } catch (err) {
    return next(err);
  }
}

function ensureAdmin(req, res, next) {
  try {
    if (!res.locals.user || !res.locals.user.isAdmin) {
      throw new ExpressError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

function ensureCorrectEmployee(req, res, next) {
  try {
    const user = res.locals.user;
    if (!(user && (user.isAdmin || user.empId === req.body.emp_id))) {
      throw new ExpressError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}


module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
  ensureCorrectEmployee,
};
