import { Product } from "../models/productModel.js";

export const createProduct = async (data) => {
  return await Product.create(data);
};

export const getProducts = async (filters, options) => {
  return await Product.findAll({
    where: filters,
    limit: options.limit,
    offset: options.offset,
  });
};

export const getProductById = async (id) => {
  return await Product.findByPk(id);
};

export const updateProduct = async (id, data) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  return await product.update(data);
};

export const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.destroy(); // soft delete
  return product;
};
