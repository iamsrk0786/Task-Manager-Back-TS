import { Router } from 'express';
import * as taskController from '../controllers/task';

const router = Router();

router.get('/tasks', taskController.getTasks);
router.post('/tasks', taskController.createTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.put("/tasks/:id", taskController.updateTask);


export default router;
