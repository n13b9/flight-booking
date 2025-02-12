import Status from "http-status";
import AirplaneService from "../services/airplane-service.js";
import { ErrorResponse, SuccessResponse } from "../utils/common/index.js";

async function createAirplane(req, res) {
  try {
    console.log("inside controller", req.body);
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.data = airplane;
    return res.status(Status.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(Status.BAD_REQUEST).json(ErrorResponse);
  }
}

export default { createAirplane };
