import Task, { ITask } from "../models/task";

export const getAllTasks = async (
  search?: string | null,
  sort?: "title" | "priority" | "statuss" | "dueAsc" | "dueDesc" | null
): Promise<ITask[]> => {
  let query: Record<string, any> = {};

  // Add search filter
  if (search) {
    query.title = { $regex: search, $options: "i" }; // Case-insensitive search
  }

  // Fetch tasks from the database
  let tasks = await Task.find(query);

  // Sorting logic
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
  } else if (sort === "dueAsc") {
    // Sort by due date in ascending order (earliest first)
    // Tasks without a dueDate are treated as having the least priority in sorting:
    //For ascending order, they are placed at the end (Infinity).

    tasks = tasks.sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      return dateA - dateB;
    });
  } else if (sort === "dueDesc") {
    // Sort by due date in descending order (latest first)
    //For descending order, they are placed at the start (0).

    tasks = tasks.sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
      return dateB - dateA;
    });
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
