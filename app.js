import express from "express";
import helmet from "helmet";
import cors from "cors";
import productRoutes from "./src/routes/productRoutes.js";

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/api/v1/products", productRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

export default app;
