import { Router } from 'express';
import { DeletePublicFileController } from '../controllers/public/deletePublicFile';
import { VerifyROLEMiddleware } from '../middlewares/verifyRole.middleware';
import { VerifyTokenMiddleware } from '../middlewares/verifyToken.middleware';

export const generalRoutes = Router();

// Middlewares
const verifyToken = new VerifyTokenMiddleware();
const verifyRole = new VerifyROLEMiddleware();

// Controllers
const deleteFile = new DeletePublicFileController();

generalRoutes.delete(
  '/public/file',
  [verifyToken.run, verifyRole.run],
  deleteFile.run
);
