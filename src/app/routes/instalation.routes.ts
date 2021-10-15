import { Router } from 'express';
import { CreateInstalationController } from '../controllers/instalation/createInstalation.controller';
import { DeleteInstalationImageController } from '../controllers/instalation/deleteImage.controller';
import { DeleteInstalationController } from '../controllers/instalation/deleteInstalation.controller';
import { GetAllInstalationController } from '../controllers/instalation/getAllInstalations.controller';
import { GetInstalationController } from '../controllers/instalation/getInstalation.controller';
import { UpdateInstalationController } from '../controllers/instalation/updateInstalation.controller';
import { UploadInstalationImageController } from '../controllers/instalation/uploadInstalationImage.controller';

import { VerifyROLEMiddleware } from '../middlewares/verifyRole.middleware';
import { VerifyTokenMiddleware } from '../middlewares/verifyToken.middleware';

export const instalationRouter = Router();

// Middlewares
const verifyToken = new VerifyTokenMiddleware();
const verifyRole = new VerifyROLEMiddleware();

// Controller
const createInstalation = new CreateInstalationController();
const uploadImage = new UploadInstalationImageController();
const getAllInstalations = new GetAllInstalationController();
const getInstalation = new GetInstalationController();
const deleteInstalation = new DeleteInstalationController();
const deleteImage = new DeleteInstalationImageController();
const updateInstalation = new UpdateInstalationController();

instalationRouter.post(
  '',
  [verifyToken.run, verifyRole.run],
  createInstalation.run
);

instalationRouter.post(
  '/image',
  [verifyToken.run, verifyRole.run],
  uploadImage.run
);

instalationRouter.get('/all', getAllInstalations.run);
instalationRouter.get('/:instalationUuid', getInstalation.run);

instalationRouter.delete(
  '/',
  [verifyToken.run, verifyRole.run],
  deleteInstalation.run
);

instalationRouter.delete(
  '/image',
  [verifyToken.run, verifyRole.run],
  deleteImage.run
);

instalationRouter.put(
  '',
  [verifyToken.run, verifyRole.run],
  updateInstalation.run
);
