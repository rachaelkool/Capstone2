const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const expressError = require("../expressError");

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;


class Employee {
  static async authenticate(empId, password) {
    const result = await db.query(
          `SELECT employee_id AS "empId",
                  password,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  is_admin AS "isAdmin"
           FROM employees
           WHERE employee_id = $1`,
        [empId],
    );

    const employee = result.rows[0];

    if (employee) {
      const isValid = await bcrypt.compare(password, employee.password);
      if (isValid === true) {
        delete employee.password;
        return employee;
      }
    }

    throw new expressError("Invalid employee_id/password");
  }

  static async register({ empId, password, firstName, lastName, isAdmin }) {
    const duplicateCheck = await db.query(
          `SELECT employee_id AS "empId"
           FROM employees
           WHERE employee_id = $1`,
        [empId],
    );

    if (duplicateCheck.rows[0]) {
      throw new expressError(`Duplicate employee_id: ${empId}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
          `INSERT INTO employees
           (employee_id,
            password,
            first_name,
            last_name,
            is_admin)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING employee_id AS "empId", first_name AS "firstName", last_name AS "lastName", is_admin AS "isAdmin"`,
        [
          empId,
          hashedPassword,
          firstName,
          lastName,
          isAdmin,
        ],
    );

    const employee = result.rows[0];

    return employee;
  }

  static async getAll() {
    const result = await db.query(
          `SELECT employee_id AS "empId",
                  first_name AS "firstName",
                  last_name AS "lastName",
                  is_admin AS "isAdmin"
           FROM employees
           ORDER BY employee_id`,
    );

    return result.rows;
  }

  static async get(empId) { 
    const empRes = await db.query(
          `SELECT employee_id AS "empId",
                  first_name AS "firstName",
                  last_name AS "lastName",
                  is_admin AS "isAdmin"
           FROM employees
           WHERE employee_id = $1`,
        [empId],
    );

    const employee = empRes.rows[0];

    if (!employee) throw new expressError(`No employee: ${empId}`);

    return employee;
  }

  static async update(empId, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          empId: "empId",
          firstName: "first_name",
          lastName: "last_name",
          isAdmin: "is_admin",
        });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE employees
                      SET ${setCols} 
                      WHERE employee_id = ${usernameVarIdx} 
                      RETURNING employee_id AS "empId",
                                first_name AS "firstName",
                                last_name AS "lastName",
                                is_admin AS "isAdmin"`;
    const result = await db.query(querySql, [...values, empId]);
    const employee = result.rows[0];

    if (!employee) throw new expressError(`No employee: ${empId}`);

    delete employee.password;
    return employee;
  }

  static async remove(empId) {
    let result = await db.query(
          `DELETE
           FROM employees
           WHERE employee_id = $1
           RETURNING employee_id AS "empId"`,
        [empId],
    );
    const employee = result.rows[0];

    if (!employee) throw new expressError(`No employee: ${empId}`);
  }
}


module.exports = Employee;
