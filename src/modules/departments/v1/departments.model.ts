import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../../../config/db/config";

class Department extends Model<
  InferAttributes<Department>, // Attributes available on Admin instances
  InferCreationAttributes<Department>
> {
  // Attributes available when creating Admin instances>
  declare id: CreationOptional<string>; // Mark as optional for creation
  declare nameEn: string;
  declare nameAr: string;


}

Department.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
   
    nameEn: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nameAr: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
 
  },
  {
    sequelize,
    modelName: "departments",
    paranoid: true,
  }
);



export default Department;
