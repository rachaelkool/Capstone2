const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";


function createToken(employee) {
  console.assert(employee.isAdmin !== undefined,
      "createToken passed employee without isAdmin property");

  let payload = {
    empId: employee.empId,
    isAdmin: employee.isAdmin || false,
  };

  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };