const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

class AppError extends Error {
  constructor(
    name,
    statusCode,
    description,
    isOperational,
    errorStack,
    logingErrorResponse
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = logingErrorResponse;
    Error.captureStackTrace(this);
  }
}

//api Specific Errors
class APIError extends Error {
  constructor(message, source, statusCode) {
    super();
    this.statusCode = statusCode || 500;
    this.message = message;
    this.source = source || 'Unknown';
  }
}

//400
class BadRequestError extends AppError {
  constructor(description = "Bad request", logingErrorResponse) {
    super(
      "NOT FOUND",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      false,
      logingErrorResponse
    );
  }
}

//400
class ValidationError extends AppError {
  constructor(description = "Validation Error", errorStack) {
    super(
      "BAD REQUEST",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      errorStack
    );
  }
}

module.exports = {
  AppError,
  APIError,
  BadRequestError,
  ValidationError,
  STATUS_CODES,
};
