import { Router } from 'express';

import { DeleteUserController } from '../controllers/users/deleteUser.controller';
import { GetAllUsersController } from '../controllers/users/getAllUsers.controller';
import { GetUserController } from '../controllers/users/getUser.controller';
import { GetUserByEmailController } from '../controllers/users/getUserByEmail.controller';
import { UpdateUserImageController } from '../controllers/users/updateUserImage.controller';
import { VerifyROLEMiddleware } from '../middlewares/verifyRole.middleware';
import { VerifyTokenMiddleware } from '../middlewares/verifyToken.middleware';

export const userRouter = Router();

// Middlewares
const verifyToken = new VerifyTokenMiddleware();
const verifyRole = new VerifyROLEMiddleware();

// Controllers
const deleteUserController = new DeleteUserController();
const updateImge = new UpdateUserImageController();
const getAllUsers = new GetAllUsersController();
const getUser = new GetUserController();
const getUserByEmail = new GetUserByEmailController();

userRouter.get('/all', [verifyToken.run, verifyRole.run], getAllUsers.run);
userRouter.get('/:userUuid', [verifyToken.run], getUser.run);
userRouter.get('/email/:email', [verifyToken.run], getUserByEmail.run);

userRouter.delete(
  '/:userUuid',
  [verifyToken.run, verifyRole.run],
  deleteUserController.run
);

userRouter.post('/image', [verifyToken.run], updateImge.run);
