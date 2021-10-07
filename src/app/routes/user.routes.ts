import { Router } from 'express';
import { InvalidateUserController } from '../controllers/auth/invalidateUser.controller';
import { LoginController } from '../controllers/auth/login.controller';
import { LoginTokenController } from '../controllers/auth/loginToken.controller';
import { SignupController } from '../controllers/auth/signup.controller';
import { ValidateNewUserController } from '../controllers/auth/validateNewUser.controller';
import { ValidateUserController } from '../controllers/auth/validateUser.controller';
import { VerifyROLEMiddleware } from '../middlewares/verifyRole.middleware';
import { VerifyTokenMiddleware } from '../middlewares/verifyToken.middleware';

export const userRouter = Router();

// Middlewares
const verifyToken = new VerifyTokenMiddleware();
const verifyRole = new VerifyROLEMiddleware();

// Controllers
const signupController = new SignupController();
const validateNewUserController = new ValidateNewUserController();
const invalidateuserController = new InvalidateUserController();
const loginUserController = new LoginController();
const loginTokenUserController = new LoginTokenController();
const validateUserController = new ValidateUserController();

userRouter.post('/signup', signupController.run);
userRouter.post(
  '/validate-new',
  [verifyToken.run],
  validateNewUserController.run
);
userRouter.post(
  '/validate',
  [verifyToken.run, verifyRole.run],
  validateUserController.run
);
userRouter.post('/login', loginUserController.run);
userRouter.post(
  '/login-token',
  [verifyToken.run],
  loginTokenUserController.run
);
userRouter.post(
  '/invalidate',
  [verifyToken.run, verifyRole.run],
  invalidateuserController.run
);
