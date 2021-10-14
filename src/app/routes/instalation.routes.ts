import { Router } from 'express';
import { CreateInstalationController } from '../controllers/instalation/createInstalation.controller';

import { VerifyROLEMiddleware } from '../middlewares/verifyRole.middleware';
import { VerifyTokenMiddleware } from '../middlewares/verifyToken.middleware';

export const instalationRouter = Router();

// Middlewares
const verifyToken = new VerifyTokenMiddleware();
const verifyRole = new VerifyROLEMiddleware();

// Controller
const createInstalation = new CreateInstalationController();

instalationRouter.post(
  '',
  [verifyToken.run, verifyRole.run],
  createInstalation.run
);
