import Task from "../models/task.js";
import User from '../models/user.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

const signUp = async (req, res) => {
    const { email, username, password } = req.body;
    try {
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Check if the email is already registered
      const existingUser = await User.findOne({
        where: { email: email,username:username },
      });
  
      if (existingUser) {
        return res.status(400).json({ message: "Email or username address is already in use" });
      }
  
      // If the email is unique, create a new user
      const newUser = await User.create({ username, email, password: hashedPassword });
      const token = jwt.sign({ userId: newUser.id }, JWT_SECRET );
  
      res.status(201).json({ user: newUser, token });
    } catch (error) {
      console.log("error",error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

const login = async (req, res) => {
 
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: { email: email },
      });
      console.log("de",user);
  
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ userId: user.id }, JWT_SECRET ); 
        res.status(200).json({ message: "Login successful", token,user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}; 

const getAllTasks = async (req, res) => {

  const userId = req.params.userId; // Access userId from req.params.userId

  try {
    // Find tasks associated with the specific user ID
    const tasks = await Task.findAll({
      where: {
        userId: userId,
      },
    });
    // Send the tasks as a response
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

 
  

  const createTask = async (req, res) => { 
    const { description, isCompleted,userId } = req.body;;
    try {
      // Create a new task associated with the specific user
      const newTask = await Task.create({ description, isCompleted, userId });
      res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { description, isCompleted } = req.body;
  try {
    const updatedTask = await Task.update(
      { description, isCompleted },
      { where: { id: taskId } }
    );
    res.status(200).json({updatedTask,message:"sucessfully updated"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    await Task.destroy({ where: { id: taskId } });
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { signUp, login, createTask, updateTask, deleteTask,getAllTasks };
