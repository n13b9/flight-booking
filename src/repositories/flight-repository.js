import CrudRepository from "./crud-repository.js";
import db from "../models/index.js";
import { Sequelize } from "sequelize";

class FlightRepository extends CrudRepository {
  constructor() {
    super(db.Flight);
  }

  async getAllFlights(filter, sort) {
    const response = await db.Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: db.Airplane,
          required: true,
          as: "airplane_detail",
        },
        {
          model: db.Airport,
          required: true,
          as: "departure_airport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.depertureAirportId"),
              "=",
              Sequelize.col("departure_airport.code")
            ),
          },
        },
        {
          model: db.Airport,
          required: true,
          as: "arrival_airport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportId"),
              "=",
              Sequelize.col("arrival_airport.code")
            ),
          },
        },
      ],
    });
    return response;
  }
}

export default FlightRepository;
