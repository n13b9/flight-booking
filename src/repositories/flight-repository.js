import CrudRepository from "./crud-repository.js";
import db from "../models/index.js";

class FlightRepository extends CrudRepository {
  constructor() {
    super(db.Flight);
  }

  async getAllFlights(filter, sort) {
    const response = await db.Flight.findAll({
      where: filter,
      order: sort,
    });
    return response;
  }
}

export default FlightRepository;
