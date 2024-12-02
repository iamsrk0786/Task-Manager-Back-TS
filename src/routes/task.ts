import { Router } from "express";
import * as taskController from "../controllers/task";
import authMiddleware from "../middleware/auth";

const router = Router();

// router.get(
//   "/tasks",
//   authMiddleware,
//   taskController.getTasks
// );
router.get("/tasks/my", authMiddleware, taskController.taskById);
router.post("/tasks", authMiddleware, taskController.createTask);
// router.delete("/tasks/:id", authMiddleware, taskController.deleteTask);
// router.put("/tasks/:id", authMiddleware, taskController.updateTask);
router
  .route("/tasks/:id")
  .put(authMiddleware, taskController.updateTask)
  .delete(authMiddleware, taskController.deleteTask);

export default router;
