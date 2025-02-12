"use strict";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Sequelize from "sequelize";
import process from "process";

// Convert the file URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the config
const env = process.env.NODE_ENV || "development";
const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../config/config.json"))
)[env];

const db = {};

// Initialize Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Dynamically load all models
const files = fs.readdirSync(__dirname).filter((file) => {
  return (
    file !== path.basename(__filename) && // Exclude this file
    file.endsWith(".js") && // Include only .js files
    !file.startsWith(".") && // Exclude hidden files
    !file.endsWith(".test.js") // Exclude test files
  );
});

// Import and initialize each model
for (const file of files) {
  const modelModule = await import(path.join(__dirname, file));
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

// Set up associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export the Sequelize instance and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
