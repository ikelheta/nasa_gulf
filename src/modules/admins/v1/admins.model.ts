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

class Admin extends Model<
  InferAttributes<Admin>, // Attributes available on Admin instances
  InferCreationAttributes<Admin>
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

Admin.init(
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
    modelName: "admins",
    paranoid: true,
  }
);

Admin.beforeCreate(async (user: any, options) => {
  const hashedPassword = await user.hashPassword(user.password);
  user.password = hashedPassword;
});

Admin.beforeUpdate(async (user: any, options) => {
  if (user.change("password")) {
    const hashedPassword = await user.hashPassword(user.password);
    user.password = hashedPassword;
  }
});

export default Admin;
