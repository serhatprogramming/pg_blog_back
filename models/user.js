import { DataTypes, Model } from "sequelize";
import { sequelize } from "../util/db.js";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: "unique_username",
        msg: "Username must be unique",
      },
      validate: {
        isEmail: {
          msg: "Username must be a valid email address",
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: true,
    underscored: true,
  }
);

export default User;
