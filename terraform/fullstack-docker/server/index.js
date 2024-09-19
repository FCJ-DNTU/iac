const http = require("http");
const express = require("express");
const cors = require("cors");

// Import utils
const Utils = require("./utils");

// Import database connection
const mySQLClient = require("./database/mysql");

const app = express();
const server = http.createServer(app);

// Add global middleware
app.use(cors({
  origin: "*"
}));

// Create router
const router = express.Router();

// Create some APIs
app.get("/", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    o.data = "Welcome to my app";
    return o;
  });
});

app.get("/check", (req, res) => {
  mySQLClient.query(
    "SELECT * FROM USERS",
    function(err, results) {
      return Utils.Error.handleResponseError(app, res, function(o) {
        if (err)
          throw err;

        o.data = {
          message: "Check app",
          checkResult: results
        };
        return o;
      });
    }
  );
});

// Apply router
app.use(router);

// Start server
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "0.0.0.0";
server.listen(PORT, HOST, function() {
  console.log(`Your server is listening on http://localhost:${PORT}`);
});