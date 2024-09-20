const HTTPUtils = require("./http");
const ErrorUtils = require("./error");
const StringUtils = require("./string");

class Utils {
  static Http = new HTTPUtils();
  static Error = new ErrorUtils(Utils.Http);
  static String = new StringUtils();
}

module.exports = Utils;