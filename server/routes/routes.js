import express from "express";
import { signUp, login, createTask, updateTask, deleteTask } from "../controllers/userController.js";

const router = express.Router();

// Authentication Routes
router.post("/signup", signUp);
router.post("/login", login);

// Task Routes
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
