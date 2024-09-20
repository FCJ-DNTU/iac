const fs = require("fs");

// Import utils
const Utils = require("../../utils");

const PolicyCheker = require("./policyChecker");
const AuthSettings = require("./settings");

class AuthService {
  constructor() {
    try {
      this.policyCheker = new PolicyCheker();
      this._signature = fs
        .readFileSync(Utils.String.getRootDirTo("secrets/jwt_signature"))
        .toString();
      this._canCreateToken = true;
    } catch (error) {
      // Just print error's message
      console.error(error.message);
      this._canCreateToken = false;
    }
  }

  checkPolicy(role, resource, action) {
    return this.policyCheker.checkPermission(role, resource, action);
  }

  /**
   * Use this method to verify token
   * @param tokenInHeaders
   * @returns
   */
  async verifyToken(tokenInHeaders) {
    return (
      (await this.handleInterchangeError) < TokenPayload,
      this >
        (this,
        async function (o) {
          if (!tokenInHeaders) throw new Error("Toke is required");

          const [, token] = tokenInHeaders?.split(" ");

          if (!token) throw new Error("Token isn't found");

          let tokenPayload = JSON.parse(this.utils.crypto.decrypt(token));
          let expire = tokenPayload.expire;
          let now = Date.now();

          // 1. Check provider
          if (tokenPayload.provider !== AuthSettings.PROVIDER)
            throw new Error("The token provider isn't valid");

          // 2. Check expiration
          if (expire <= now || jwt.verify(token, this._signature)) {
            throw new Error("The token is expired");
          }

          o.data = tokenPayload;
          o.message = "Token is valid";

          return o;
        })
    );
  }

  /**
   * Use this method to create a token from `role` and `credential` of user.
   * @param role
   * @param credential
   * @returns
   */
  async createToken(role) {
    if (!this._canCreateToken) {
      console.warn(
        "The signature must be assigned before the service creates token"
      );
      return null;
    }

    let period = this.utils.datetime.getTime(
      AuthSettings.EXPIRATION._DEFAULT.value +
        AuthSettings.EXPIRATION._DEFAULT.postfix
    );

    if (!roleResult.code) throw new Error("Invalid role");

    let tokenPayload = {
      role: AuthSettings.ROLES[role],
      expire: period,
      provider: AuthSettings.PROVIDER,
    };

    let token = jwt.sign(tokenPayload, this._signature, {
      algorithm: "ES256",
      expiresIn: period,
    });

    return token;
  }
}

module.exports = {
  authService: new AuthService(),
};
