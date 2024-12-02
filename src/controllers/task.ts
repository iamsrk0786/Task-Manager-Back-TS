import { Request, Response } from "express";
import * as taskService from "../services/task";
interface AuthRequest extends Request {
  user?: any;
}

// export const getTasks = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { search, sort } = req.query;
//     const tasks = await taskService.getAllTasks(
//       search as string | null,
//       sort as "title" | "priority" | "statuss" | "dueAsc" | "dueDesc" | null
//     );
//     res.status(200).json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching tasks" });
//   }
// };

export const taskById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { search, sort } = req.query;
    const task = await taskService.getUserAllTasks(
      userId,
      search as string | null,
      sort as "title" | "priority" | "statuss" | "dueAsc" | "dueDesc" | null
    );
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (e) {
    res.status(500).json({ message: "Error fetching task" });
  }
};

export const createTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, description, priority, statuss, dueDate } = req.body;

    if (!title || !req.user) {
      res.status(400).json({ message: "Title and user are required" });
    }

    const newTask = await taskService.createTask({
      title,
      description,
      priority: priority || "High",
      statuss: statuss || "To-Do",
      dueDate,
      user: req.user.id, // Pass the user's ID only
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error); // Log errors for debugging
    res.status(500).json({ message: "Error creating task" });
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, priority, statuss, dueDate } = req.body;
    if (!title || !req.user) {
      res.status(400).json({ message: "Title and user are required" });
    }
    const updatedTask = await taskService.updateTask(id, {
      title,
      description,
      priority: priority || "High",
      statuss: statuss || "To-Do",
      dueDate,
      user: req.user.id,
    });
    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.status(200).json(updatedTask);
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const deletedTask = await taskService.deleteTask(id);
    if (!deletedTask) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.status(200).json(deletedTask);
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
