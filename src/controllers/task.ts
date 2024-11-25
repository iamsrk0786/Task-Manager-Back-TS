import { Request, Response } from "express";
import * as taskService from "../services/task";

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, sort } = req.query;
    const tasks = await taskService.getAllTasks(
      search as string | null,
      sort as "title" | "priority" | "statuss" | "dueAsc" | "dueDesc" | null
    );
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, description, priority, statuss, dueDate } = req.body;
    const newTask = await taskService.createTask({
      title,
      description,
      priority: priority || "High", 
      statuss: statuss || "To-Do",   
      dueDate,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};
export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, priority, statuss, dueDate } = req.body;
    const updatedTask = await taskService.updateTask(id, {
      title,
      description,
      priority: priority || "High", 
      statuss: statuss || "To-Do",  
      dueDate,
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
): Promise<void> => {
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
