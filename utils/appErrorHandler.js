class AppError extends Error {
  constructor(message, statusCode, err) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.errStack = err;
  }
}

module.exports = AppError;