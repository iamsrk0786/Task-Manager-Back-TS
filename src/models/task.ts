import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low'; 
  completed: boolean;
  dueDate?: Date;

}

const taskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' }, // Default priority
  completed: { type: Boolean, default: false },
  dueDate: { type: Date },
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
