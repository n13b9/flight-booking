import express from "express";

import { FlightController } from "../../controllers/index.js";
// import { FlightMiddlewares } from "../../middlewares/index.js";

const router = express.Router();

router.post("/", FlightController.createFlight);
// router.get("/", FlightController.getFlights);

export default router;
