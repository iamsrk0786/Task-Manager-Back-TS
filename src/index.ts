import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connect";
import taskRoutes from "./routes/task";
import userRoutes from "./routes/user";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api", taskRoutes);
app.use("/api", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Task Manager API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

