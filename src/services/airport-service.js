import { AirportRepository } from "../repositories/index.js";
import status from "http-status";
import AppError from "../utils/errors/app-error.js";

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    const response = await airportRepository.create(data);
    return response;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      let explaination = [];
      error.errors.forEach((error) => {
        explaination.push(error.message);
      });
      throw new AppError(explaination, status.BAD_REQUEST);
    }
    throw new AppError(
      "cannot create airport object",
      status.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirports() {
  try {
    const response = await airportRepository.getAll();
    return response;
  } catch (error) {
    throw new AppError(
      "cannot fetch data of all airports",
      status.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirport(id) {
  try {
    const response = await airportRepository.get(id);
    return response;
  } catch (error) {
    if (error.status === status.NOT_FOUND) {
      throw new AppError(
        "cannot fetch data of airport you requested",
        status.NOT_FOUND
      );
    }
    throw new AppError(
      "cannot fetch data of airport",
      status.INTERNAL_SERVER_ERROR
    );
  }
}
async function destroyAirport(id) {
  try {
    const response = await airportRepository.destory(id);
    return response;
  } catch (error) {
    if (error.status === status.NOT_FOUND) {
      throw new AppError("cannot delete airport", status.NOT_FOUND);
    }
    throw new AppError("cannot delete airport", status.NOT_FOUND);
  }
}

export default { createAirport, getAirports, getAirport, destroyAirport };
