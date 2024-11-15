import { Request, Response } from 'express';
import * as taskService from '../services/task';

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    const newTask = await taskService.createTask({ title, description, completed: false });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedTask = await taskService.deleteTask(id);
    if (!deletedTask) {
      res.status(404).json({ message: 'Task not found' });
    } else {
      res.status(200).json(deletedTask);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};
