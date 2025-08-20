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
// post
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

router.get("/", listProducts);

router.get("/:id", getProductById);

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);
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

export default router;
