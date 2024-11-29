export interface ITask {
    _id: string;
    title: string;
    description: string;
    priority: "High" | "Medium" | "Low";
    statuss: "To-Do" | "In-Progress" | "Completed";
  }
  export interface IUser {
    Name: string;
    Email: string;
    Password: string;
    createdAt?: Date|null;
  }