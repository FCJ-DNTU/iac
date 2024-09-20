const { Handler, Controller } = require("../classes/controller");

// Import database client
const { mySQLCLientActions } = require("../database/mysql");

const userController = new Controller("/users");
const tableName = "USERS";

userController.appendHandler(
  new Handler("/:id", "get", null, function (req, res) {
    const { id } = req.params;
    const that = this;

    return that.utils.Error.handleResponseError(that, res, async function (o) {
      if (!id) throw new Error("Id of user is required");

      o.data = await mySQLCLientActions.exec(
        `SELECT * FROM ${tableName}\n` + `WHERE ${tableName}.id LIKE ${id};`
      );
      o.message = "Query user successfully";

      if (results.length === 0) o.message = "";

      return o;
    });
  })
);

module.exports = userController;
