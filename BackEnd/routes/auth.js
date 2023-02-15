const jsonschema = require("jsonschema");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const employeeAuthSchema = require("../schemas/employeeAuth.json");
const employeeRegisterSchema = require("../schemas/employeeRegister.json");
const expressError = require("../expressError");
const Employee = require("../models/employee");


router.post("/token", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, employeeAuthSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new expressError(errs);
    }

    const { empId, password } = req.body;
    const employee = await Employee.authenticate(empId, password);
    const token = createToken(employee);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

router.post("/register", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, employeeRegisterSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new expressError(errs);
    }

    const newEmployee = await Employee.register({ ...req.body, isAdmin: false });
    const token = createToken(newEmployee);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;