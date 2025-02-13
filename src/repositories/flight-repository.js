import CrudRepository from "./crud-repository.js";
import db from "../models/index.js";

class FlightRepository extends CrudRepository {
  constructor() {
    super(db.Flight);
  }
}

export default FlightRepository;
