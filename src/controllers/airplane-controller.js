import Status from "http-status";
import { AirplaneService } from "../services/index.js";
import { ErrorResponse, SuccessResponse } from "../utils/common/index.js";

async function createAirplane(req, res) {
  try {
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

async function getAirplanes(req, res) {
  try {
    const airplanes = await AirplaneService.getAirplanes();
    SuccessResponse.data = airplanes;
    return res.status(Status.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(Status.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

// POST /airplanes/:id

async function getAirplane(req, res) {
  try {
    const airplane = await AirplaneService.getAirplane(req.params.id);
    SuccessResponse.data = airplane;
    return res.status(Status.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(Status.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

// DELETE /airplanes/:id

async function destroyAirplane(req, res) {
  try {
    const airplane = await AirplaneService.destroyAirplane(req.params.id);
    SuccessResponse.data = airplane;
    return res.status(Status.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(Status.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}
export default { createAirplane, getAirplanes, getAirplane, destroyAirplane };
