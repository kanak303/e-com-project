import { config, connectDB, sequelize } from "./src/config/config.js";
import app from "./app.js";

const startServer = async () => {
  await connectDB();
  await sequelize.sync({ alter: true });

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
};

startServer();
