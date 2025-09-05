import express from "express";
import cors from "cors";
import { config, connectDB, sequelize } from "./src/config/config.js";
import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import passport from "passport";
import "./src/config/passport.js"; 


const app = express();

app.use(passport.initialize());

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
  await sequelize.sync(); 
  app.listen(config.port, () =>
    console.log(` Server running on port ${config.port}`)
  );
};
start();

