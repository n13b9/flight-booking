"use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
import { Model, DataTypes } from "sequelize";

export default (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Flight, {
        foreignKey: "airplaneId",
        onDelete: "CASCADE",
      });
      this.hasMany(models.Seat, {
        foreignKey: "airplaneId",
        onDelete: "CASCADE",
      });
    }
  }
  Airplane.init(
    {
      modelNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isAlphanumeric: true },
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { max: 1000 },
      },
    },
    {
      sequelize,
      modelName: "Airplane",
    }
  );
  return Airplane;
};
