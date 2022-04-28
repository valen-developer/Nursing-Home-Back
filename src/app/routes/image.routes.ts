import { Router } from "express";
import { DeleteImageController } from "../controllers/images/deleteImage.controller";
import { DeleteImageByEntityController } from "../controllers/images/deleteImageByEntity.controller";
import { DeleteImageByPathController } from "../controllers/images/DeleteImageByPath.controller";
import { VerifyROLEMiddleware } from "../middlewares/verifyRole.middleware";
import { VerifyTokenMiddleware } from "../middlewares/verifyToken.middleware";

export const imageRouter = Router();

// Middlewares
const verifyToken = new VerifyTokenMiddleware();
const verifyRole = new VerifyROLEMiddleware();

imageRouter.delete(
  "/:uuid",
  [verifyToken.run, verifyRole.run],
  new DeleteImageController().run
);
imageRouter.delete(
  "/entity/:uuid",
  [verifyToken.run, verifyRole.run],
  new DeleteImageByEntityController().run
);
imageRouter.delete(
  "/",
  [verifyToken.run, verifyRole.run],
  new DeleteImageByPathController().run
);
