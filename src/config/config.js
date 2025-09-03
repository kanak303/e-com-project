import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "*",
  db: {
    name: process.env.DB_NAME || "ecommerce_db",
    user: process.env.DB_USER || "root",
    pass: process.env.DB_PASS || "123456789",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
  },
};

export const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.pass,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: "mysql",
    logging: false,
  }
);

// DB connection
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(" Database connected successfully!");
  } catch (error) {
    console.error("Failed to connect DB:", error);
  }
};
