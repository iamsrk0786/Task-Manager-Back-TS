import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  statuss: "To-Do" | "In-Progress" | "Completed";
  dueDate?: Date|null;
}

const taskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "High",
  },
  statuss: {
    type: String,
    enum: ["To-Do", "In-Progress", "Completed"],
    default: "To-Do",
  },
  dueDate: { type: Date },
});

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
