import Status from "http-status";
import { ErrorResponse } from "../utils/common/index.js";

function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = { explaination: "Model Number not found" };
    return res.status(Status.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

export default { validateCreateRequest };
