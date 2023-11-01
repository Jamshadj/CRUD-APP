import express from "express";
import { signUp, login, createTask, updateTask, deleteTask, getAllTasks } from "../controllers/userController.js";
import authenticateJWT from "../middlewares/authMiddleware.js";

const router = express.Router();

// Authentication Routes
router.post("/signup", signUp);
router.post("/login", login);
 
// Task Routes

router.get("/tasks/:userId", authenticateJWT, getAllTasks);
router.post("/tasks",authenticateJWT, createTask);
router.put("/tasks/:id",authenticateJWT, updateTask);
router.delete("/tasks/:id",authenticateJWT, deleteTask);

export default router;
