"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.createTask = exports.getTasks = void 0;
const taskService = __importStar(require("../services/task"));
const getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};
exports.getTasks = getTasks;
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = await taskService.createTask({ title, description, completed: false });
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating task' });
    }
};
exports.createTask = createTask;
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await taskService.deleteTask(id);
        if (!deletedTask) {
            res.status(404).json({ message: 'Task not found' });
        }
        else {
            res.status(200).json(deletedTask);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting task' });
    }
};
exports.deleteTask = deleteTask;
