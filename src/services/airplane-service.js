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

export default { createAirplane };
