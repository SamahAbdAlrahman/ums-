import { DataTypes } from "sequelize";
import sequelize from "../connection.js"; 
import { UserModel } from "../models/users.js"; 

const blogModel = sequelize.define('Blog', {
  title: {
    type: DataTypes.STRING(50), 
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT, 
    allowNull: false,
  }
});

UserModel.hasMany(blogModel);
blogModel.belongsTo(UserModel);
export default blogModel; 