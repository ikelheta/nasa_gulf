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

class Contractor extends Model<
  InferAttributes<Contractor>, // Attributes available on Admin instances
  InferCreationAttributes<Contractor>
> {
  // Attributes available when creating Admin instances>
  declare id: CreationOptional<string>; // Mark as optional for creation
  declare image: string;
  declare nameEn: string;
  declare nameAr: string;
  declare email: string;




}

Contractor.init(
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
    nameEn: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nameAr: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    modelName: "contractors",
    paranoid: true,
  }
);


export default Contractor;
