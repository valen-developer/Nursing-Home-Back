import { Router } from 'express';

import { DeleteUserController } from '../controllers/users/deleteUser.controller';
import { GetAllUsersController } from '../controllers/users/getAllUsers.controller';
import { GetUserController } from '../controllers/users/getUser.controller';
import { VerifyROLEMiddleware } from '../middlewares/verifyRole.middleware';
import { VerifyTokenMiddleware } from '../middlewares/verifyToken.middleware';

export const userRouter = Router();

// Middlewares
const verifyToken = new VerifyTokenMiddleware();
const verifyRole = new VerifyROLEMiddleware();

// Controllers
const deleteUserController = new DeleteUserController();
const getAllUsers = new GetAllUsersController();
const getUser = new GetUserController();

userRouter.get('/all', [verifyToken.run, verifyRole.run], getAllUsers.run);
userRouter.get('', [verifyToken.run], getUser.run);

userRouter.delete(
  '',
  [verifyToken.run, verifyRole.run],
  deleteUserController.run
);