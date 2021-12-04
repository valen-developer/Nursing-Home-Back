import { Router } from 'express';

import { ChangePasswordController } from '../controllers/auth/changePassword.controller';
import { InvalidateUserController } from '../controllers/auth/invalidateUser.controller';
import { LoginController } from '../controllers/auth/login.controller';
import { LoginTokenController } from '../controllers/auth/loginToken.controller';
import { RecoveryPasswordController } from '../controllers/auth/recoveryPassword.controller';
import { SignupController } from '../controllers/auth/signup.controller';
import { TurnUserAdminController } from '../controllers/auth/turnUserAdmin.controller';
import { ValidateNewUserController } from '../controllers/auth/validateNewUser.controller';
import { ValidateUserController } from '../controllers/auth/validateUser.controller';

import { VerifyROLEMiddleware } from '../middlewares/verifyRole.middleware';
import { VerifyTokenMiddleware } from '../middlewares/verifyToken.middleware';

export const authRouter = Router();

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
const changePasswordController = new ChangePasswordController();
const recoveryPassword = new RecoveryPasswordController();
const turnUserAdmin = new TurnUserAdminController();

authRouter.patch(
  '/turn-admin/:uuid',
  [verifyToken.run, verifyRole.run],
  turnUserAdmin.run
);

// Auth
authRouter.post('/signup', signupController.run);
authRouter.post(
  '/validate-new',
  [verifyToken.run],
  validateNewUserController.run
);
authRouter.post(
  '/validate',
  [verifyToken.run, verifyRole.run],
  validateUserController.run
);
authRouter.post('/login', loginUserController.run);
authRouter.post(
  '/login-token',
  [verifyToken.run],
  loginTokenUserController.run
);
authRouter.post(
  '/invalidate',
  [verifyToken.run, verifyRole.run],
  invalidateuserController.run
);

authRouter.patch(
  '/change-password',
  [verifyToken.run],
  changePasswordController.run
);
authRouter.post('/recovery-pass', recoveryPassword.run);
