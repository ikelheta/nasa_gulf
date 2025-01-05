import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../../../config/db/config";

class Role extends Model<
  InferAttributes<Role>, // Attributes available on Admin instances
  InferCreationAttributes<Role>
> {
  // Attributes available when creating Admin instances>
  declare id: CreationOptional<string>; // Mark as optional for creation
  declare nameEn: string;
  declare nameAr: string;


}

Role.init(
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
    modelName: "roles",
    paranoid: true,
  }
);



export default Role;
