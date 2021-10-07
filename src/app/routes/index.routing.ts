import { Router } from 'express';
import { authRouter } from './auth.routes';
import { userRouter } from './user.routes';

export const router = Router();

router.use('/user', authRouter);
router.use('/user', userRouter);
