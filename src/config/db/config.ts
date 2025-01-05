import { Dialect, Sequelize } from "sequelize";
import("dotenv/config");

const dbName = process.env.DATABASE_NAME as string;

const dbUsername = process.env.DATABASE_USERNAME as string;
const dbPassword = process.env.DATABASE_PASSWORD as string;
const dbHost = process.env.DATABASE_HOST as string;
const dbPort = process.env.DATABASE_PORT as string;
const dbDialect = process.env.DATABASE_DIALECT as Dialect;
const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  port: Number(dbPort),
  pool: {
    max: 100,
    min: 0,
    acquire: 90000,
    idle: 10000,
  },
  dialect: dbDialect,
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database successfully...");
  })
  .catch((error) => {
    throw new Error("Unable to connect to the database: " + error);
  });

export default sequelize;
