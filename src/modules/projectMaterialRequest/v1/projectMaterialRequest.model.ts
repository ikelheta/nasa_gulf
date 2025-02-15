import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../../../config/db/config";
import Project from "../../project/v1/projects.model";
import Employee from "../../employees/v1/employees.model";
import { ProjectMaterialRequestStatus } from "../../../shared/enums";
import Admin from "../../admins/v1/admins.model";

class ProjectMaterialRequest extends Model<
  InferAttributes<ProjectMaterialRequest>,
  InferCreationAttributes<ProjectMaterialRequest>
> {
  // Attributes available when creating Admin instances




}

ProjectMaterialRequest.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },   
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Project,
        key: "id",
      },
    },
    createdByEmployee: {
      type: DataTypes.UUID,
      references: {
        model: Employee,
        key: "id",
      },
    },
    createdByAdmin: {
      type: DataTypes.UUID,
      references: {
        model: Admin,
        key: "id",
      },
    },
    status : {
      type : DataTypes.STRING,
      defaultValue : ProjectMaterialRequestStatus.PENDING
    }
  },
  {
    sequelize,
    modelName: "project_material_request",
    indexes : [{fields : ["projectId"]}]
  }
);


export default ProjectMaterialRequest;
