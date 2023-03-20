const db = require("../db");
const Employee = require("../models/employee");


describe("Test Employee class", function () {
  beforeEach(async function () {
    await db.query("DELETE FROM employees");
    let e = await Employee.register({
      empId: 3001,
      password: "password",
      firstName: "Test",
      lastName: "Testy",
      isAdmin: true
    });
  });

  test("can register", async function () {
    let e = await Employee.register({
      empId: 4001,
      password: "password",
      firstName: "New",
      lastName: "Employee",
      isAdmin: false
    });

    expect(e.empId).toBe(4001);
  });

  test("can authenticate", async function () {
    let isValid = await Employee.authenticate(3001, "password");
    expect(isValid).toBeTruthy();
    try {
        await Employee.authenticate(3001, "xxx");
    } catch (e) {
        expect(e).toHaveProperty('message', "Invalid employee_id/password");
    }
  });

  test("can get employee", async function () {
    let e = await Employee.get(3001);
    expect(e).toEqual({
      empId: 3001,
      firstName: "Test",
      lastName: "Testy",
      isAdmin: true,
    });
  });

  test("can get all employees", async function () {
    let e = await Employee.getAll();
    expect(e).toEqual([{
      empId: 3001,
      firstName: "Test",
      lastName: "Testy",
      isAdmin: true
    }]);
  });

  test("can update employee", async function () {
    await db.query("UPDATE employees SET last_name='UpdatedName' WHERE employee_id=3001");
    let e = await Employee.get(3001);
    expect(e.lastName).toBe('UpdatedName');
  });
});

afterAll(async function() {
  await db.end();
});