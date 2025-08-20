import crypto from "crypto";

class ProductService {
  constructor() {
    // in-memory store
    this.products = new Map();
  }

  create(input) {
    const id = crypto.randomUUID();
    const now = new Date();
    const product = {
      id,
      deletedAt: null,
      createdAt: now,
      updatedAt: now,
      ...input,
    };
    this.products.set(id, product);
    return product;
  }
}

export const productService = new ProductService();

import { randomUUID } from "crypto";

let products = [];

// CREATE
export function create(input) {
  const newProduct = {
    id: randomUUID(),
    name: input.name,
    price: input.price,
    sku: input.sku,
    stock: input.stock,
    deletedAt: null,
  };
  products.push(newProduct);
  return newProduct;
}

// List with pagination and  search by name/sku and soft delete filter)
export function list({ page, limit, q, includeDeleted }) {
  let filtered = [...products];

  if (q) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.sku.toLowerCase().includes(q.toLowerCase()),
    );
  }

  if (!includeDeleted) {
    filtered = filtered.filter((p) => !p.deletedAt);
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = filtered.slice(start, end);

  return { total, page, limit, data };
}

// GET BY ID
export function getById(id) {
  return products.find((p) => p.id === id && !p.deletedAt);
}

//  UPDATE
export function update(id, data) {
  const index = products.findIndex((p) => p.id === id && !p.deletedAt);
  if (index === -1) return null;

  const updated = { ...products[index], ...data, updatedAt: new Date() };
  products[index] = updated;
  return updated;
}

// Soft delete product
export function softDelete(id) {
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return null; // Product not found
  }

  // Mark product as deleted
  products[productIndex].deleted = true;
  products[productIndex].deletedAt = new Date();

  return products[productIndex];
}

// (Make sure you also have createProduct, getProductById, etc. here)
export function createProduct(product) {
  products.push(product);
  return product;
}

export function listProducts() {
  return products.filter((p) => !p.deleted); // only active products
}
