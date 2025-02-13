import { FlightRepository } from "../repositories/index.js";
import status from "http-status";
import AppError from "../utils/errors/app-error.js";

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const response = await flightRepository.create(data);
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
      "cannot create flight object",
      status.INTERNAL_SERVER_ERROR
    );
  }
}

export default { createFlight };
