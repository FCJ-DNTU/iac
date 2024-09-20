const { Handler, Controller } = require("../classes/controller");

// Import database client
const { mySQLCLientActions } = require("../database/mysql");

// Import services
const { authService } = require("../services/auth");

const authController = new Controller("/auth");
const usersTable = "USERS";

authController.appendHandler(
  new Handler("/sign-up", "post", null, function (req, res) {
    const data = req.body;

    return this.utils.Error.handleResponseError(this, res, async function (o) {
      const user = await mySQLCLientActions.exec(
        `SELECT * FROM ${usersTable}\n` +
          `WHERE ${usersTable}.username LIKE ${data.username}`
      );

      if (user) throw new Error("This user is exist");

      const fields = Object.keys(data);
      const fieldsText = fields.join(", ");
      const fieldsData = fields.map((field) => data[field]).join(", ");

      o.data = await mySQLCLientActions.exec(
        `INSERT INTO ${usersTable} (${fieldsText})\n` +
          `VALUES (${fieldsData});`
      );
      o.message = "Sign up successfully";

      if (results.length === 0) o.message = "";

      return o;
    });
  })
);

authController.appendHandler(
  new Handler("/sign-in", "post", null, function (req, res) {
    const data = req.body;

    return this.utils.Error.handleResponseError(this, res, async function (o) {
      const user = await mySQLCLientActions.exec(
        `SELECT * FROM ${usersTable}\n` +
          `WHERE ${usersTable}.username LIKE ${data.username}`
      );

      if (user) throw new Error("This user is exist");

      if (user.password !== data.password) throw new Error("Password is wrong");

      o.data = {
        token: await authService.createToken("USER"),
      };
      o.message = "Sign up successfully";

      if (results.length === 0) o.message = "";

      return o;
    });
  })
);

module.exports = authController;
