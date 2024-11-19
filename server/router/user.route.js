import express from 'express';
const router = express.Router();

import { validateRequest } from '../middleware/validate.request.js';
import { userSchema } from '../schemas/index.js';

import { add } from '../controller/users/create.user.js';
import { userDetails } from '../controller/users/get.user.js';
import { usersDetails } from '../controller/users/get.users.js';
import { login } from '../controller/users/login.user.js';
import { tokenControl } from '../controller/users/auth.token.js';
router.post('/', validateRequest(userSchema), add);
router.get('/:userId', userDetails);
router.get('/', usersDetails);
router.post('/login', login);
router.get('/validate-token', tokenControl);

export default router;
