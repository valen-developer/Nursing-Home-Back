import { Router } from 'express';
import { CreateJobController } from '../controllers/jobs/createJob.controller';
import { DeleteJobController } from '../controllers/jobs/deleteJob.controller';
import { GetAllJobsController } from '../controllers/jobs/getAllJobs.controller';
import { GetJobController } from '../controllers/jobs/getJob.controller';
import { VerifyROLEMiddleware } from '../middlewares/verifyRole.middleware';
import { VerifyTokenMiddleware } from '../middlewares/verifyToken.middleware';

export const jobRouter = Router();

// Middlewares
const verifyToken = new VerifyTokenMiddleware();
const verifyRole = new VerifyROLEMiddleware();

// Controller
const getAll = new GetAllJobsController();
const getJob = new GetJobController();
const createJob = new CreateJobController();
const jobDeleter = new DeleteJobController();

jobRouter.post('', [verifyToken.run, verifyRole.run], createJob.run);

jobRouter.delete('', [verifyToken.run, verifyRole.run], jobDeleter.run);

jobRouter.get('/all', getAll.run);
jobRouter.get('', getJob.run);
