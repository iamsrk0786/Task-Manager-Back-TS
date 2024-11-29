import { Router } from "express";
import * as taskController from "../controllers/task";
import authMiddleware from "../middleware/auth";
import checkTaskOwnership from "../middleware/taskcheck";

const router = Router();

router.get(
  "/tasks",
  authMiddleware,
//   checkTaskOwnership,
  taskController.getTasks
);
router.get(
  "/tasks/:id",
  authMiddleware,
  checkTaskOwnership,
  taskController.taskById
);
router.post("/tasks", authMiddleware, taskController.createTask);
router.delete(
  "/tasks/:id",
  authMiddleware,
  checkTaskOwnership,
  taskController.deleteTask
);
router.put(
  "/tasks/:id",
  authMiddleware,
  checkTaskOwnership,
  taskController.updateTask
);

export default router;
