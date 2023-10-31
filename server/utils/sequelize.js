import { Sequelize } from "sequelize";
import dbConfig from "../config/dbConfig.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Synchronize models with the database (create tables if they don't exist)
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testDatabaseConnection();

export default sequelize;
