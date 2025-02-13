import Status from "http-status";
import { AirportService } from "../services/index.js";
import { ErrorResponse, SuccessResponse } from "../utils/common/index.js";

async function createAirport(req, res) {
  try {
    const airport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });
    SuccessResponse.data = airport;
    return res.status(Status.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(Status.BAD_REQUEST).json(ErrorResponse);
  }
}

async function getAirports(req, res) {
  try {
    const airports = await AirportService.getAirports();
    SuccessResponse.data = airports;
    return res.status(Status.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(Status.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

// POST /airport/:id

async function getAirport(req, res) {
  try {
    const airport = await AirportService.getAirport(req.params.id);
    SuccessResponse.data = airport;
    return res.status(Status.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(Status.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

// DELETE /airport/:id

async function destroyAirport(req, res) {
  try {
    const airport = await AirportService.destroyAirport(req.params.id);
    SuccessResponse.data = airport;
    return res.status(Status.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(Status.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

export default { createAirport, getAirports, getAirport, destroyAirport };
