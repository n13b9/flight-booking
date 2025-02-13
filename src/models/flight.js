"use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {

import { Model, DataTypes } from "sequelize";

export default (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane, { foreignKey: "airplaneId" });
      this.belongsTo(models.Airport, { foreignKey: "code" });
      this.belongsTo(models.Airport, { foreignKey: "code" });
    }
  }
  Flight.init(
    {
      flightNumber: { type: DataTypes.STRING, allowNull: false },
      airplaneId: { type: DataTypes.INTEGER, allowNull: false },
      depertureAirportId: { type: DataTypes.STRING, allowNull: false },
      arrivalAirportId: { type: DataTypes.STRING, allowNull: false },
      arrivalTime: { type: DataTypes.DATE, allowNull: false },
      departureTime: { type: DataTypes.DATE, allowNull: false },
      price: DataTypes.INTEGER,
      bordingGate: { type: DataTypes.STRING },
      totalSeats: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Flight",
    }
  );
  return Flight;
};
