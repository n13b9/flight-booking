import express from "express";

import { AirplaneController } from "../../controllers/index.js";
import { AirplaneMiddlewares } from "../../middlewares/index.js";

const router = express.Router();

console.log("inside airplane routes");

router.post("/", AirplaneController.createAirplane);

export default router;
