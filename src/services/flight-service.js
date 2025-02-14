import { FlightRepository } from "../repositories/index.js";
import status from "http-status";
import AppError from "../utils/errors/app-error.js";
import { Op } from "sequelize";

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

async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter = [];

  if (query.trips) {
    const [depertureAirportId, arrivalAirportId] = query.trips.split("-");

    if (!depertureAirportId || !arrivalAirportId) {
      throw new AppError("Invalid trips format", status.BAD_REQUEST);
    }

    if (depertureAirportId === arrivalAirportId) {
      throw new AppError(
        "Departure and arrival airports cannot be the same",
        status.BAD_REQUEST
      );
    }

    customFilter.depertureAirportId = depertureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
  }

  if (query.price) {
    const [min, max] = query.price.split("-").map(Number);

    if (isNaN(min) || (max && isNaN(max))) {
      throw new AppError("Invalid price range format", status.BAD_REQUEST);
    }

    customFilter.price = {
      [Op.between]: [min || 0, max || 50000],
    };
  }

  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }

  if (query.tripDate) {
    customFilter.departureTime = {
      [Op.between]: [query.tripDate, query.tripDate + " 23:59:00"],
    };
  }

  if (query.sort) {
    const params = query.sort.split(",");
    const sortFilters = params.map((p) => {
      return p.split("_");
    });
    sortFilter = sortFilters;
  }

  try {
    console.log(customFilter, sortFilter, "here");
    const response = await flightRepository.getAllFlights(
      customFilter,
      sortFilter
    );
    console.log("Fetched flights:", response);
    return response;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw new AppError(
      "Cannot fetch flight data",
      status.INTERNAL_SERVER_ERROR
    );
  }
}

export default { createFlight, getAllFlights };
