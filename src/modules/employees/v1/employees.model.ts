import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../../../config/db/config";
import { DEFAULT_IMAGE_PATH, SALT } from "../../../shared/constant";

class Employee extends Model<
  InferAttributes<Employee>, // Attributes available on Admin instances
  InferCreationAttributes<Employee>
> {
  // Attributes available when creating Admin instances>
  declare id: CreationOptional<string>; // Mark as optional for creation
  declare image: string;
  declare name: string;
  declare email: string;
  declare password: string;
  declare passwordChangedAt: CreationOptional<Date>;

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(SALT);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}

Employee.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DEFAULT_IMAGE_PATH,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordChangedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "employees",
    paranoid: true,
  }
);

Employee.beforeCreate(async (user: any, options) => {
  const hashedPassword = await user.hashPassword(user.password);
  user.password = hashedPassword;
});



export default Employee;
