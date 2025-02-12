import express from "express";
import InfoController from "../../controllers/info-controller.js";
import airplaneRoutes from "./airplane-routes.js";

const router = express.Router();

// router.get("/info", InfoController.info);

console.log("inside v1 routes");
router.use("/airplanes", airplaneRoutes);

export default router;
