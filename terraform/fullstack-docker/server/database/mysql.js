const mysql2 = require('mysql2');

console.log("Host:", process.env.MYSQL_CONTAINER);
console.log("DB User:", process.env.MYSQL_USER);
console.log("DB Pass:", process.env.MYSQL_USER_PASSWORD);

const connection = mysql2.createConnection({
  host: process.env.MYSQL_CONTAINER,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_USER_PASSWORD,
  database: 'TODOAPP'
}, function(err) {
  console.log(err);
});

// Export the connection or use it in your routes
module.exports = connection;
