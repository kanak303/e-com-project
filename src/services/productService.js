import Product from "../models/productModel.js";

export const createProduct = async (data) => await Product.create(data);

export const getProducts = async () => await Product.findAll();

export const getProductById = async (id) => await Product.findByPk(id);

export const updateProduct = async (id, data) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  return await product.update(data);
};

export const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.destroy();
  return product;
};
