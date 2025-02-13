import Status from "http-status";
import { FlightService } from "../services/index.js";
import { ErrorResponse, SuccessResponse } from "../utils/common/index.js";

// POST /flights
// req.body    { flightNumber, airplaneId, depertureAirportId, arrivalAirportId, arrivalTime, departureTime, price, bordingGate, totalSeats }

async function createFlight(req, res) {
  try {
    const flight = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      depertureAirportId: req.body.depertureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
      bordingGate: req.body.bordingGate,
      totalSeats: req.body.totalSeats,
    });
    SuccessResponse.data = flight;
    return res.status(Status.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(Status.BAD_REQUEST).json(ErrorResponse);
  }
}

export default { createFlight };
