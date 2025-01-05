import { DataTypes, Model } from "sequelize";
import Project from "../../modules/project/v1/projects.model";
import sequelize from "../../config/db/config";
import Employee from "../../modules/employees/v1/employees.model";

class ProjectEngineers extends Model {}

ProjectEngineers.init(
  {
    projectId: {
      type: DataTypes.UUID,
      references: {
        model: Project,
        key: "id",
      },
    },
    engineersId: {
      type: DataTypes.UUID,
      references: {
        model: Employee,
        key: "id",
      },
    },

    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "project_engineers",
    paranoid: true,
  }
);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default ProjectEngineers;
