import Status from "http-status";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/errors/app-error.js";

function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    ErrorResponse.message = "Something went wrong...";
    ErrorResponse.error = new AppError([
      "Model number not found in req format",
    ]);
    return res.status(Status.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

export default { validateCreateRequest };
