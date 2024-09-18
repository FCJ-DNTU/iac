const HTTPUtils = require("./http");
const ErrorUtils = require("./error");

class Utils {
  static Http = new HTTPUtils();
  static Error = new ErrorUtils(Utils.Http);
}

module.exports = Utils;