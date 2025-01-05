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
import Contractor from "../../contractor/v1/contractor.model";
import Consultant from "../../consultant/v1/consultant.model";

class Project extends Model<
  InferAttributes<Project>, // Attributes available on Admin instances
  InferCreationAttributes<Project>
> {
  // Attributes available when creating Admin instances>
  declare id: CreationOptional<string>; // Mark as optional for creation
  declare image: string;
  declare nameEn: string;
  declare nameAr: string;
  declare description: string;
  declare location: string;
  declare code: string;
  declare contractorId: string;
  declare subContractorId: string;
  declare consultantId: string;




}

Project.init(
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
    location: {
      type: DataTypes.STRING(512)
    },
    code: {
      type: DataTypes.STRING(255)
    },
    description: {
      type: DataTypes.STRING(255)
    },
    contractorId: {
      type: DataTypes.UUID,
      references: {
        model: Contractor,
        key: 'id',
      },
    },
    consultantId: {
      type: DataTypes.UUID,
      references: {
        model: Consultant,
        key: 'id',
      },
    },
    subContractorId: {
      type: DataTypes.UUID,
      references: {
        model: Contractor,
        key: 'id',
      },
    },

  },
  {
    sequelize,
    modelName: "projects",
    paranoid: true,
  }
);


export default Project;
