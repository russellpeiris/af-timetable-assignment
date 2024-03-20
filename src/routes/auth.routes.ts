import { Router } from 'express';
import { login, register } from '../auth/auth.controller';
import { authenticate, authorizeAdmin } from '../middlewares/auth.middleware';

const authRouter = Router();

authRouter.post('/register', authenticate, authorizeAdmin, register);
authRouter.post('/login', login);

export default authRouter;
