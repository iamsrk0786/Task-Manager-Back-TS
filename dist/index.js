"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = __importDefault(require("./config/connect"));
const task_1 = __importDefault(require("./routes/task"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Connect to MongoDB
(0, connect_1.default)();
// Middleware
app.use(express_1.default.json());
app.use('/api', task_1.default);
// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Task Manager API');
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
