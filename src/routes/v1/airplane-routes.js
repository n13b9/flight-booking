import express from "express";

import { AirplaneController } from "../../controllers/index.js";
import { AirplaneMiddlewares } from "../../middlewares/index.js";

const router = express.Router();

console.log("inside airplane routes");

router.post(
  "/",
  AirplaneMiddlewares.validateCreateRequest,
  AirplaneController.createAirplane
);

router.get("/", AirplaneController.getAirplanes);
router.get("/:id", AirplaneController.getAirplane);
router.delete("/:id", AirplaneController.destroyAirplane);

export default router;
