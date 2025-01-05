import { DataTypes, Model } from "sequelize";
import Project from "../../modules/project/v1/projects.model";
import Contractor from "../../modules/contractor/v1/contractor.model";
import sequelize from "../../config/db/config";


class ProjectSubContractors extends Model {}

ProjectSubContractors.init(
  {

    projectId: {
      type: DataTypes.UUID,
      references: {
        model: Project,
        key: "id",
      },
    },
    contractorId: {
        type: DataTypes.UUID,
        references: {
          model: Contractor,
          key: "id",
        },
      },
     
   
    deletedAt: {
      type: DataTypes.DATE,
    },
   
  },
  {
    sequelize,
    modelName: "project_contractors",
    paranoid: true,
  }
);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export default ProjectSubContractors;