import Task, { ITask } from '../models/task';

export const getAllTasks = async (): Promise<ITask[]> => {
  return Task.find();
};

export const createTask = async (taskData: Partial<ITask>): Promise<ITask> => {
  const task = new Task(taskData);
  return task.save();
};

export const deleteTask = async (taskId: string): Promise<ITask | null> => {
  return Task.findByIdAndDelete(taskId);
};
