const jsonschema = require("jsonschema");
const express = require("express");
const expressError = require("../expressError");
const Employee = require("../models/employee");
const { createToken } = require("../helpers/tokens");
const router = express.Router();
const employeeNewSchema = require("../schemas/employeeNew.json");
const employeeUpdateSchema = require("../schemas/employeeUpdate.json");


router.post("/", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, employeeNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new expressError(errs);
    }

    const employee = await Employee.register(req.body);
    const token = createToken(employee);
    return res.status(201).json({ employee, token });
  } catch (err) {
    return next(err);
  }
});

router.get("/", async function (req, res, next) {
  try {
    const employees = await Employee.getAll();
    return res.json({ employees });
  } catch (err) {
    return next(err);
  }
});

router.get("/:empId", async function (req, res, next) {
  try {
    const employee = await Employee.get(req.params.empId);
    return res.json({ employee });
  } catch (err) {
    return next(err);
  }
});

router.patch("/:empId", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, employeeUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new expressError(errs);
    }
    const employee = await Employee.update(req.params.empId, req.body);
    return res.json({ employee });
  } catch (err) {
    return next(err);
  }
});



router.delete("/:empId", async function (req, res, next) {
  try {
    await Employee.remove(req.params.empId);
    return res.json({ deleted: req.params.empId });
  } catch (err) {
    return next(err);
  }
});




module.exports = router;