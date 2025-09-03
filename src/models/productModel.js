import { DataTypes } from "sequelize";
import { sequelize } from "../config/config.js";

const Product = sequelize.define("Product", {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  sku: { type: DataTypes.STRING, allowNull: false, unique: true },
  stock: { type: DataTypes.INTEGER, allowNull: false },
}, {
  timestamps: true,
  // soft delete
  paranoid: true, 
  tableName: "products",
});

export default Product;

