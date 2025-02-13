import { CityRepository } from "../repositories/index.js";
import status from "http-status";
import AppError from "../utils/errors/app-error.js";

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    console.log("inside city service datt", data);
    const response = await cityRepository.create(data);
    return response;
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      let explaination = [];
      error.errors.forEach((error) => {
        explaination.push(error.message);
      });
      throw new AppError(explaination, status.BAD_REQUEST);
    }
    throw new AppError(
      "cannot create city object",
      status.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCities() {
  try {
    const response = await cityRepository.getAll();
    return response;
  } catch (error) {
    throw new AppError(
      "cannot fetch data of all cities",
      status.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCity(id) {
  try {
    const response = await cityRepository.get(id);
    return response;
  } catch (error) {
    if (error.status === status.NOT_FOUND) {
      throw new AppError(
        "cannot fetch data of city you requested",
        status.NOT_FOUND
      );
    }
    throw new AppError(
      "cannot fetch data of city",
      status.INTERNAL_SERVER_ERROR
    );
  }
}
async function destroyCity(id) {
  try {
    const response = await cityRepository.destory(id);
    return response;
  } catch (error) {
    if (error.status === status.NOT_FOUND) {
      throw new AppError("cannot delete city", status.NOT_FOUND);
    }
    throw new AppError("cannot delete city", status.NOT_FOUND);
  }
}

export default { createCity, getCities, getCity, destroyCity };
