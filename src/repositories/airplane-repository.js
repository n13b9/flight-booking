import CrudRepository from "./crud-repository.js";
import db from "../models/index.js";

// import Airplane from "../models/airplane.js";

// const Airplane = getAirplaneModel(sequelize); // Initialize the model

class AirplaneRepository extends CrudRepository {
  constructor() {
    super(db.Airplane);
  }
}

export default AirplaneRepository;
