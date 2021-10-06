import { Router } from 'express';
import { SignupController } from '../controllers/auth/signup.controller';

export const userRouter = Router();

// Controllers
const signupController = new SignupController();

userRouter.post('/signup', signupController.run);
