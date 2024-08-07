import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Note = db.define(
  "Notes",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    content: {
      type: DataTypes.TEXT, // Menggunakan TEXT untuk konten yang lebih panjang
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    tags: {
      type: DataTypes.JSON,
      defaultValue: [], // Default adalah array kosong
      allowNull: true, // `tags` bisa kosong
    },

    isPinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(Note, { foreignKey: "userId" });
Note.belongsTo(User, { foreignKey: "userId" });

export default Note;
