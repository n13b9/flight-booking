import Status from "http-status";
import { CityService } from "../services/index.js";
import { ErrorResponse, SuccessResponse } from "../utils/common/index.js";

async function createCity(req, res) {
  try {
    const city = await CityService.createCity({
      name: req.body.name,
    });
    SuccessResponse.data = city;
    return res.status(Status.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(Status.BAD_REQUEST).json(ErrorResponse);
  }
}

async function getCities(req, res) {
  try {
    const cities = await CityService.getCities();
    SuccessResponse.data = cities;
    return res.status(Status.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(Status.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function getCity(req, res) {
  try {
    const city = await CityService.getCity(req.params.id);
    SuccessResponse.data = city;
    return res.status(Status.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(Status.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function destroyCity(req, res) {
  try {
    const city = await CityService.destroyCity(req.params.id);
    SuccessResponse.data = city;
    return res.status(Status.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(Status.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

export default {
  createCity,
  getCities,
  getCity,
  destroyCity,
};
