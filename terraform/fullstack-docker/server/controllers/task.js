const { Handler, Controller } = require("../classes/controller");

// Import database client
const { mySQLCLientActions } = require("../database/mysql");

const taskController = new Controller("/tasks");
const tableName = "TASKS";

taskController.appendHandler(
  new Handler("/", "get", null, function (req, res) {
    const { skip = 0, limit = 10 } = req.query;

    return this.utils.Error.handleResponseError(this, res, async function (o) {
      o.data = await mySQLCLientActions.exec(
        `SELECT * FROM ${tableName}\n` + `LIMIT ${limit} OFFSET ${skip};`
      );
      o.message = "Query tasks successfully";

      if (results.length === 0) o.message = "";

      return o;
    });
  })
);

module.exports = taskController;
