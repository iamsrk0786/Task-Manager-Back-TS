import Task, { ITask } from "../models/task";

export const getUserAllTasks = async (
  userId: string, 
  search?: string | null,
  sort?: "title" | "priority" | "statuss" | "dueAsc" | "dueDesc" | null
): Promise<ITask[]> => {
  let query: Record<string, any> = { user: userId }; 

  if (search) {
    query.title = { $regex: search, $options: "i" }; // Case-insensitive search
  }

  let tasks = (await Task.find(query).lean()) as ITask[]; // `lean()` converts Mongoose documents to plain JavaScript objects

  if (!tasks || tasks.length === 0) {
    throw new Error("No tasks found");
  }

  if (sort === "title") {
    tasks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "priority") {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  } else if (sort === "statuss") {
    const statusOrder = { "To-Do": 1, "In-Progress": 2, Completed: 3 };
    tasks.sort((a, b) => statusOrder[a.statuss] - statusOrder[b.statuss]);
  } else if (sort === "dueAsc") {
    tasks.sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      return dateA - dateB;
    });
  } else if (sort === "dueDesc") {
    tasks.sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
      return dateB - dateA;
    });
  }

  return tasks;
};

// export const getAllTasks = async (
//   id: string,
//   search?: string | null,
//   sort?: "title" | "priority" | "statuss" | "dueAsc" | "dueDesc" | null
// ): Promise<ITask[]> => {
//   let query: Record<string, any> = {};

//   if (search) {
//     query.title = { $regex: search, $options: "i" }; // Case-insensitive search
//   }

//   // let tasks = await Task.find(query);
//   let tasks = await Task.findById(id, query);
//   if (!tasks) {
//     throw new Error("tasks not found");
//   }

//   if (sort === "title") {
//     tasks = tasks.sort((a, b) => a.title.localeCompare(b.title));
//   } else if (sort === "priority") {
//     const priorityOrder = { High: 1, Medium: 2, Low: 3 };
//     tasks = tasks.sort(
//       (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
//     );
//   } else if (sort === "statuss") {
//     const statusOrder = { "To-Do": 1, "In-Progress": 2, Completed: 3 };
//     tasks = tasks.sort(
//       (a, b) => statusOrder[a.statuss] - statusOrder[b.statuss]
//     );
//   } else if (sort === "dueAsc") {
//     // Sort by due date in ascending order (earliest first)
//     // Tasks without a dueDate are treated as having the least priority in sorting:
//     //For ascending order, they are placed at the end (Infinity).

//     tasks = tasks.sort((a, b) => {
//       const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
//       const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
//       return dateA - dateB;
//     });
//   } else if (sort === "dueDesc") {
//     // Sort by due date in descending order (latest first)
//     //For descending order, they are placed at the start (0).

//     tasks = tasks.sort((a, b) => {
//       const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
//       const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
//       return dateB - dateA;
//     });
//   }

//   return tasks;
// };

export const createTask = async (taskData: Partial<ITask>): Promise<ITask> => {
  if (!taskData.title || !taskData.user) {
    throw new Error("Title and user are required to create a task");
  }

  const task = new Task({
    ...taskData,
    user: taskData.user,
  });

  return await task.save();
};

export const updateTask = async (
  id: string,
  taskData: Partial<ITask>
): Promise<ITask | null> => {
  if (!taskData.title || !taskData.user) {
    throw new Error("Title and user are required to Update a task");
  }
  return Task.findByIdAndUpdate(
    id,
    { ...taskData, user: taskData.user },
    {
      new: true,
      runValidators: true,
    }
  );
};
export const deleteTask = async (taskId: string): Promise<ITask | null> => {
  return Task.findByIdAndDelete(taskId);
};
