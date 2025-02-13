import express from "express";

import { CityController } from "../../controllers/index.js";
import { CityMiddlewares } from "../../middlewares/index.js";

const router = express.Router();

router.post("/", CityController.createCity);
router.get("/", CityController.getCities);
router.get("/:id", CityController.getCity);

export default router;
