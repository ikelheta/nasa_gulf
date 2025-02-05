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

class Item extends Model<
  InferAttributes<Item>, 
  InferCreationAttributes<Item>
> {
  // Attributes available when creating Admin instances




}

Item.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    
    },
    unit: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  
  },
  {
    sequelize,
    modelName: "items",
  }
);


export default Item;
