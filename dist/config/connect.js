"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/task-ts');
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};
exports.default = connectDB;
