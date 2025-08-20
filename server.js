import express from "express";
import productRoutes from "./src/routes/productRoutes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { config } from "./src/config/config.js"; 

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1/products", productRoutes);

// Error handler 
app.use(errorHandler);

// Start server using PORT from .env/config
app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
