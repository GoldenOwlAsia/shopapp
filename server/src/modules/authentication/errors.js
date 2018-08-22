class AuthorizationError extends Error {
  constructor(message) {
    super(message || "Unauthorized");
    this.status = 401;
  }
}

class TokenExpiredError extends Error {
  constructor() {
    super("Token expired");
    this.status = 401;
  }
}

export {
  AuthorizationError,
  TokenExpiredError
}
