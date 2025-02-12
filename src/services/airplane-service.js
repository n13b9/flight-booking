import AirplaneRepository from "../repositories/airplane-repository.js";
import status from "http-status";
import AppError from "../utils/errors/app-error.js";

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    // console.log("inside service", data);
    const response = await airplaneRepository.create(data);
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
      "cannot create airplane object",
      status.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplanes() {
  try {
    const response = await airplaneRepository.getAll();
    return response;
  } catch (error) {
    throw new AppError(
      "cannot fetch data of all airplanes",
      status.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplane(id) {
  try {
    const response = await airplaneRepository.get(id);
    return response;
  } catch (error) {
    if (error.status === status.NOT_FOUND) {
      throw new AppError(
        "cannot fetch data of airplane you requested",
        status.NOT_FOUND
      );
    }
    throw new AppError(
      "cannot fetch data of airplane",
      status.INTERNAL_SERVER_ERROR
    );
  }
}
async function destroyAirplane(id) {
  try {
    const response = await airplaneRepository.destory(id);
    return response;
  } catch (error) {
    if (error.status === status.NOT_FOUND) {
      throw new AppError("cannot delete airplane", status.NOT_FOUND);
    }
    throw new AppError("cannot delete airplane", status.NOT_FOUND);
  }
}

export default { createAirplane, getAirplanes, getAirplane, destroyAirplane };
