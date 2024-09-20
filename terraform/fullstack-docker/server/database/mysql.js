const mysql2 = require("mysql2");

const connection = mysql2.createConnection(
  {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_USER_PASSWORD || "your-mysql-user-password",
    database: "TODOAPP",
  },
  function (err) {
    console.log(err);
  }
);

const actions = {
  async exec(queryString) {
    const result = new Promise((resolve, reject) => {
      connection.query(queryString, function (err, results) {
        if (err) reject(err);

        resolve(results);
      });
    });

    return result;
  },
};

// Export the connection or use it in your routes
module.exports = {
  mySQLClient: connection,
  mySQLCLientActions: actions,
};
