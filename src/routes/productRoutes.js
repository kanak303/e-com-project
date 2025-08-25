import { Router } from "express";
import { body } from "express-validator";
import {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = Router();

// Create product
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("sku").notEmpty().withMessage("SKU is required"),
    body("stock")
      .isInt({ min: 0 })
      .withMessage("Stock must be a non-negative integer"),
  ],
  createProduct,
);

// List products
router.get("/", listProducts);

// Get product by ID
router.get("/:id", getProductById);

// Update product
router.put(
  "/:id",
  [
    body("name").optional().notEmpty(),
    body("price").optional().isNumeric(),
    body("sku").optional().notEmpty(),
    body("stock").optional().isInt({ min: 0 }),
  ],
  updateProduct,
);

// Delete product
router.delete("/:id", deleteProduct);

export default router;
