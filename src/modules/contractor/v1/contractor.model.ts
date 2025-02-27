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

class Contractor extends Model<any> {
  // Attributes available when creating Admin instances>
  declare id: CreationOptional<string>; // Mark as optional for creation
  declare image: string;
  declare nameEn: string;
  declare nameAr: string;
  declare email: string;
  declare phoneNumber: string;
  declare vatNumber: string;
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
    phoneNumber: {
      type: DataTypes.STRING(255),
    },
    vatNumber: {
      type: DataTypes.STRING(255),
    },
    bankAccountNumber : {
      type: DataTypes.STRING(255),
    },
    authorizedLetter  : {
      type: DataTypes.STRING(255),
    },
    typeOfWork  : {
      type: DataTypes.STRING(255),
    },
  },
  {
    sequelize,
    modelName: "contractors",
    paranoid: true,
  }
);

export default Contractor;
