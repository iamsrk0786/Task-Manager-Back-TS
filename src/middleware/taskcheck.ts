import { Request, Response, NextFunction } from "express";
import Task from "../models/task";
export interface AuthRequest extends Request {
    user?: any; // Replace `any` with the appropriate type for your decoded JWT payload
  }
// Middleware to check if user owns the task
 const checkTaskOwnership = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
       res.status(404).json({ message: "Task not found" });
    }

    if (task?.user.toString() !== req.user.id) {
       res.status(403).json({ message: "You are not authorized to access this task" });
    }

    next(); // Allow the next handler to execute (i.e., update or delete task)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error checking task ownership" });
  }
};

export default checkTaskOwnership;