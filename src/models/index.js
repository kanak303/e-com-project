import { sequelize } from "../config/config.js";
import User from "./userModel.js";
// creates tables
await sequelize.sync(); 

export { sequelize, User };
