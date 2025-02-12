class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.statusCode = status;
    this.explaination = message;
  }
}

export default AppError;
