import { Router } from 'express';
import { CreateActivityController } from '../controllers/activity/CreateActivity.controller';
import { DeleteActivityController } from '../controllers/activity/DeleteActivity.controller';
import { GetActivityController } from '../controllers/activity/GetActivity.controller';
import { GetAllActivitiesController } from '../controllers/activity/GetAllActivities.controller';
import { UpdateActivityController } from '../controllers/activity/UpdateActivity.controller';
import { VerifyROLEMiddleware } from '../middlewares/verifyRole.middleware';
import { VerifyTokenMiddleware } from '../middlewares/verifyToken.middleware';

export const activityRouter = Router();

// Middlewares
const verifyToken = new VerifyTokenMiddleware();
const verifyRole = new VerifyROLEMiddleware();

// Controllers
const createActivity = new CreateActivityController();
const getActivity = new GetActivityController();
const getAllActivities = new GetAllActivitiesController();
const deleteActivity = new DeleteActivityController();
const updateActivity = new UpdateActivityController();

// Routes
activityRouter.post('', [verifyToken.run, verifyRole.run], createActivity.run);
activityRouter.put(
  '/:uuid',
  [verifyToken.run, verifyRole.run],
  updateActivity.run
);

activityRouter.get('/all', getAllActivities.run);
activityRouter.get('/:activity', getActivity.run);

activityRouter.delete(
  '/:activity',
  [verifyToken.run, verifyRole.run],
  deleteActivity.run
);
