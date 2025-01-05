import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/db/config";
import Admin from "../../admins/v1/admins.model";

class Otp extends Model {}

Otp.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    otp: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    validTo: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "otps",
    paranoid: true,
  }
);

export default Otp;
