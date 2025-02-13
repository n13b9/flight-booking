import express from "express";

import { ServerConfig, Logger } from "./config/index.js";
import apiRoutes from "./routes/index.js";
import cityRoutes from "./routes/index.js";
import airportRoutes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);
app.use("./cities", cityRoutes);
app.use("./airports", airportRoutes);

app.listen(ServerConfig, () => {
  console.log(`Server is running on port ${ServerConfig}`);
});
