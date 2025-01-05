import sequelize from "./config";
import "../../modules/admins/v1/admins.model";
import "../../modules/employees/v1/employees.model";
import "../../modules/otp/v1/otp.model";
import "../../modules/departments/v1/departments.model";
import "../../modules/roles/v1/roles.model";
import "../../modules/contractor/v1/contractor.model";

import setupAssociations from "./associations";


const createTables = async () => {
  try {
    setupAssociations()

    await sequelize.sync({ alter: true, logging: false });
    console.log("Tables created successfully...");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default createTables;
