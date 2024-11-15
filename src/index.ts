import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connect';
import taskRoutes from './routes/task';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Enable CORS
app.use(cors());


// Middleware
app.use(express.json());
app.use('/api', taskRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Task Manager API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



//Run npm run dev for development with nodemon or npm start after building the project with npm run build.

