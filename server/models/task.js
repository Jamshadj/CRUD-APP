import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize.js";
import User from './user.js'; // Import the User model

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId:{
   type:DataTypes.UUID,
   allowNull:false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

});



export default Task;
