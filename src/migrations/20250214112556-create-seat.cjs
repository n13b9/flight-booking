"use strict";
/** @type {import('sequelize-cli').Migration} */
// module.exports = {
export default {
  async up(queryInterface, Sequelize) {
    // const { BUSINESS, ECONOMY, FIRST, PREMIUM_ECONOMY } = Enums.SEAT_TYPES;
    await queryInterface.createTable("Seats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      col: {
        type: Sequelize.STRING,
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Airplanes",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      type: {
        type: Sequelize.ENUM,
        values: ["BUSINESS", "ECONOMY", "FIRST", "PREMIUM_ECONOMY"],
        defaultValue: "ECONOMY",
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Seats");
  },
};
