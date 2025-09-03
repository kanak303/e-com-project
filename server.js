// import { config, connectDB, sequelize } from "./src/config/config.js";
// import app from "./app.js";

// const startServer = async () => {
//   await connectDB();
//   await sequelize.sync({ alter: true });

//   app.listen(config.port, () => {
//     console.log(`Server running on port ${config.port}`);
//   });
// };

// startServer();

import express from "express";
import cors from "cors";
import { config, connectDB, sequelize } from "./src/config/config.js";
import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

const app = express();

// Middleware
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Error handler
app.use(errorHandler);

// Start server
const start = async () => {
  await connectDB();
  await sequelize.sync(); // sync models
  app.listen(config.port, () =>
    console.log(`🚀 Server running on port ${config.port}`)
  );
};
start();

