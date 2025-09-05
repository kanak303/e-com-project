import express from 'express';
import { body } from "express-validator";
import passport from 'passport';
import {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

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
router.get("/", passport.authenticate("jwt", { session: false }), listProducts);

router.get("/:id", passport.authenticate("jwt", { session: false }), getProductById);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  [
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("price").optional().isNumeric().withMessage("Price must be a number"),
    body("sku").optional().notEmpty().withMessage("SKU cannot be empty"),
    body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
  ],
  updateProduct
);

router.delete("/:id", passport.authenticate("jwt", { session: false }), deleteProduct);

export default router;


