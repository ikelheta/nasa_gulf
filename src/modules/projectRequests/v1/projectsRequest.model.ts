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
import Project from "../../project/v1/projects.model";
import projectsService from "../../project/v1/admin/projects.service";
import Employee from "../../employees/v1/employees.model";
import Admin from "../../admins/v1/admins.model";

class ProjectRequest extends Model<
  InferAttributes<ProjectRequest>, // Attributes available on Admin instances
  InferCreationAttributes<ProjectRequest>
> {
  // Attributes available when creating Admin instances>
  declare id: CreationOptional<string>; // Mark as optional for creation
  declare images: string[];
  declare description: string;
  declare projectId: string;
  declare code: string;
  declare type: string;
  declare requestType: string;
  declare consultantComment: string;
  declare status: boolean;
  declare createdByEmployee: string;
  declare createdByAdmin: string;
}

ProjectRequest.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    requestType: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(4096),
    },
    projectId: {
      type: DataTypes.UUID,
      references: {
        model: Project,
        key: "id",
      }
    },
    createdByEmployee: {
      type: DataTypes.UUID,
      references: {
        model: Employee,
        key: "id",
      }
    },
    createdByAdmin: {
      type: DataTypes.UUID,
      references: {
        model: Admin,
        key: "id",
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    consultantComment: {
      type: DataTypes.STRING(4096),
    
    },
  },
  {
    sequelize,
    modelName: "project_request",
    paranoid: true,
  }
);
ProjectRequest.beforeCreate(async (request: any, options) => {
  const lastRequest = await ProjectRequest.findOne({
    where: {
      projectId: request?.projectId,
    },
    order: [["createdAt", "DESC"]]
  });
  const lastCodeNum = lastRequest?.code?.split('-')?.pop()
  const codeNumber = lastRequest?.code ? Number(lastCodeNum) + 1 : 1
  request.code = `${request.code}-${codeNumber|| 1}`
});

export default ProjectRequest;
