import { Router } from 'express';
import { authRouter } from './auth.routes';
import { generalRoutes } from './general.routes';
import { instalationRouter } from './instalation.routes';
import { userRouter } from './user.routes';

export const router = Router();

router.use('/user', authRouter);
router.use('/user', userRouter);
router.use('/instalation', instalationRouter);
router.use('', generalRoutes);
