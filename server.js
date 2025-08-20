import express from "express";
import productRoutes from "./src/routes/productRoutes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

const app = express();
app.use(express.json());
app.use(errorHandler);

app.use("/api/v1/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
