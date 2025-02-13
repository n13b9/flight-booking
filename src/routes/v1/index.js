import express from "express";
import airplaneRoutes from "./airplane-routes.js";
import cityRoutes from "./city-routes.js";

const router = express.Router();

router.use("/airplanes", airplaneRoutes);
router.use("/cities", cityRoutes);

export default router;
