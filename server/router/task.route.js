import express from 'express';
import { validateRequest } from '../middleware/validate.request.js';
import { taskSchema } from '../schemas/index.js';
import { verifyToken } from '../middleware/verify.token.js';
import { add } from '../controller/tasks/create.task.js';
import { getTasks } from '../controller/tasks/get.tasks.js';
import { update } from '../controller/tasks/update.task.js';
import { remove } from '../controller/tasks/delete.task.js';
import { taskDetails } from '../controller/tasks/get.task.js';
const router = express.Router();

router.post('/', verifyToken, validateRequest(taskSchema), add);
router.get('/', getTasks);
router.get('/:taskId', taskDetails);
router.patch('/', verifyToken, validateRequest(taskSchema), update);
router.delete('/:taskId', verifyToken, remove);

export default router;
