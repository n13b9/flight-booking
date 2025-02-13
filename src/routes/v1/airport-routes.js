import express from "express";

import { AirportController } from "../../controllers/index.js";
// import { AirplaneMiddlewares } from "../../middlewares/index.js";

const router = express.Router();

router.post("/", AirportController.createAirport);

router.get("/", AirportController.getAirports);
router.get("/:id", AirportController.getAirport);
router.delete("/:id", AirportController.destroyAirport);

export default router;
