import Task, { ITask } from "../models/task";

export const getAllTasks = async (
  search?: string | null,
  sort?: "title" | "priority" | "statuss" | null
): Promise<ITask[]> => {
  let query: Record<string, any> = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  let tasks = await Task.find(query);

  if (sort === "title") {
    tasks = tasks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "priority") {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    tasks = tasks.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  } else if (sort === "statuss") {
    const statusOrder = { "To-Do": 1, "In-Progress": 2, Completed: 3 };
    tasks = tasks.sort(
      (a, b) => statusOrder[a.statuss] - statusOrder[b.statuss]
    );
  }

  return tasks;
};

export const createTask = async (taskData: Partial<ITask>): Promise<ITask> => {
  const task = new Task(taskData);
  return task.save();
};
export const updateTask = async (
  id: string,
  taskData: Partial<ITask>
): Promise<ITask | null> => {
  return Task.findByIdAndUpdate(id, taskData, {
    new: true,
    runValidators: true,
  });
};
export const deleteTask = async (taskId: string): Promise<ITask | null> => {
  return Task.findByIdAndDelete(taskId);
};
