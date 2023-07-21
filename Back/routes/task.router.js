import express from "express";
import { param } from "express-validator";

import TaskController from "../controllers/task.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import validateMiddleware from "../middleware/validate.middleware.js";
import createTaskSchema from "../schemas/createTask.schema.js";
import updateTaskSchema from "../schemas/updateTask.schema.js";
import getTasksSchema from "../schemas/getTasks.schema.js";
const router = express.Router();

router.get("/", getTasksSchema, validateMiddleware, async (req, res) => {
  const page = req.query.page;
  const order = req.query.order;
  const allTasks = await TaskController.getAllTasks(page, order);
  res.status(200).json(allTasks);
});

router.get(
  "/:id",
  param("id").isInt(),
  validateMiddleware,
  async (req, res) => {
    const id = parseInt(req.params.id);
    const task = await TaskController.getTaskById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  }
);

router.post("/", createTaskSchema, validateMiddleware, async (req, res) => {
  const { username, email, taskText } = req.body;
  const newTask = await TaskController.createTask(username, email, taskText);
  res.status(201).json(newTask);
});

router.put(
  "/:id",
  authMiddleware,
  updateTaskSchema,
  validateMiddleware,
  async (req, res) => {
    const id = parseInt(req.params.id);
    const { taskText, done } = req.body;
    const edited = !!taskText;
    const updatedTask = await TaskController.updateTask(
      id,
      taskText,
      done,
      edited
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  }
);

router.delete(
  "/:id",
  param("id").isInt(),
  validateMiddleware,
  authMiddleware,
  (req, res) => {
    const id = parseInt(req.params.id);
    const result = TaskController.deleteTask(id);
    if (!result) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(result);
  }
);
export default router;
