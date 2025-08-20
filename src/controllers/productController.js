import { validationResult } from "express-validator";
import * as productService from "../services/productService.js";

// Create the product
export function createProduct(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const product = productService.create(req.body);
  res.status(201).json({ success: true, data: product });
}

// list the product and filters
export function listProducts(req, res) {
  const { page = 1, limit = 10, q, includeDeleted } = req.query;

  const result = productService.list({
    page: parseInt(page),
    limit: parseInt(limit),
    q,
    includeDeleted: includeDeleted === "true",
  });

  res.json({ success: true, ...result });
}

// GET by ID
export function getProductById(req, res) {
  const product = productService.getById(req.params.id);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  res.json({ success: true, data: product });
}

// UPDATE
export function updateProduct(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const updated = productService.update(req.params.id, req.body);

  if (!updated) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found or deleted" });
  }

  res.json({ success: true, data: updated });
}

// Delete/Soft delete product
export function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const deletedProduct = productService.softDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      message: "Product soft-deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.error("Delete Product Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
