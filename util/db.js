import { Sequelize } from "sequelize";
import databaseUrl from "./config.js";

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return process.exit(1);
  }
};

export { connectDB, sequelize };
