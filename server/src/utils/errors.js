class NotImplementedError extends Error {}

class ValidationError extends Error {
  constructor(...args) {
    super(args);
    this.status = 400;
  }
}

class ItemNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
  }
}

class ExpiredError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ItemConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

class GeneralDatabaseError extends Error {
  constructor() {
    super("Error!");
    this.status = 500;
  }
}

export {
  NotImplementedError,
  ValidationError,
  ItemNotFoundError,
  ForbiddenError,
  BadRequestError,
  ExpiredError,
  ItemConflictError,
  GeneralDatabaseError,
};
