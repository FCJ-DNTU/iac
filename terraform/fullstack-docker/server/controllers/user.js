const { Handler, Controller } = require("../classes/controller");

// Import database client
const { mySQLCLientActions } = require("../database/mysql");

// Import middlewares
const { createPolicyChecker } = require("../middlewares/checkPolicy");
const { checkToken } = require("../middlewares/checkToken");

const userController = new Controller("/users");
const tableName = "USERS";

userController.appendHandler(
  new Handler(
    "/:id",
    "get",
    [checkToken, createPolicyChecker("users:user", "users:getUser")],
    function (req, res) {
      const { id } = req.params;
      const that = this;

      return that.utils.Error.handleResponseError(
        that,
        res,
        async function (o) {
          if (!id) throw new Error("Id of user is required");

          const result = await await mySQLCLientActions.exec(
            `SELECT * FROM ${tableName}\n` + `WHERE ${tableName}.id LIKE ${id};`
          );

          o.data = result[0];
          o.message = "Query user successfully";

          return o;
        }
      );
    }
  )
);

module.exports = userController;
