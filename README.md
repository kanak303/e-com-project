# Minimal E-Commerce Products API

This project is a **minimal e-commerce products API** built with **Express.js**.  
It demonstrates how to build a clean, production-style REST API with in-memory storage, validation, error handling, logging, and testing.  
Currently, it uses a simple in-memory store (Map/Array) — data resets on restart. Future phases will integrate SQL for persistence.

---

## Features
- **Product CRUD**
  - Create a product with `name`, `price`, `sku`, and `stock`
  - List products with **pagination** and **search filters**
  - Get product by **ID**
  - Update product details (partial updates supported)
  - Delete or **soft-delete** (mark as deletedAt, exclude by default)

- **Validation** using Zod or express-validator  
- **Centralized Error Handling** with a consistent JSON shape  
- **Logging** middleware (method, path, status, latency)  
- **Security** via Helmet & configurable CORS  
- **Health Endpoint** `/health` returns `{ "status": "ok" }`

---

## Scripts
- `dev` – run in dev mode with Nodemon  
- `start` – run server in production  
- `test` – run Jest + Supertest tests  
- `lint` – run ESLint checks  
- `format` – format code with Prettier  

---

## Example Endpoints
- `POST   /api/v1/products` → create product  
- `GET    /api/v1/products?page=1&limit=10&q=search` → list products  
- `GET    /api/v1/products/:id` → get by ID  
- `PATCH  /api/v1/products/:id` → update product  
- `DELETE /api/v1/products/:id` → soft-delete product  

---

## Status
CRUD features complete  
Validation, errors, logging, tests implemented  
Scripts ready (dev, start, test, lint, format)  
