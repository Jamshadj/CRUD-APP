import Task from "../models/task.js";
import User from '../models/user.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    log
    try {
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Check if the username or email is already registered
      const existingUser = await User.findOne({
        where: {
          [sequelize.Op.or]: [ { email }],
        },
      });
  
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const newUser = await User.create({ username, email, password: hashedPassword });
      const token = jwt.sign({ userId: newUser.id }, 'JWT_SECRET');
  
      res.status(201).json({ user: newUser, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          [sequelize.Op.or]: [
            { email: email },
          ],
        },
      });
  
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ userId: user.id }, 'JWT_SECRET'); 
        res.status(200).json({ message: "Login successful", token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
};

  

const createTask = async (req, res) => {
  const { description, isCompleted } = req.body;
  try {
    const newTask = await Task.create({ description, isCompleted });
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
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    await Task.destroy({ where: { id: taskId } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { signUp, login, createTask, updateTask, deleteTask };
