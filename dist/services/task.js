"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.createTask = exports.getAllTasks = void 0;
const task_1 = __importDefault(require("../models/task"));
const getAllTasks = async () => {
    return task_1.default.find();
};
exports.getAllTasks = getAllTasks;
const createTask = async (taskData) => {
    const task = new task_1.default(taskData);
    return task.save();
};
exports.createTask = createTask;
const deleteTask = async (taskId) => {
    return task_1.default.findByIdAndDelete(taskId);
};
exports.deleteTask = deleteTask;
