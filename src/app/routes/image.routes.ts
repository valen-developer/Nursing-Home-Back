import { Router } from "express";
import { DeleteImageController } from "../controllers/images/deleteImage.controller";
import { DeleteImageByEntityController } from "../controllers/images/deleteImageByEntity.controller";
import { GetRandomImageController } from "../controllers/images/GetRandomImage";
import { VerifyROLEMiddleware } from "../middlewares/verifyRole.middleware";
import { VerifyTokenMiddleware } from "../middlewares/verifyToken.middleware";

export const imageRouter = Router();

// Middlewares
const verifyToken = new VerifyTokenMiddleware();
const verifyRole = new VerifyROLEMiddleware();

// Controllers
const deleteImage = new DeleteImageController();
const deleteImageByentity = new DeleteImageByEntityController();

imageRouter.delete(
  "/:uuid",
  [verifyToken.run, verifyRole.run],
  deleteImage.run
);
imageRouter.delete(
  "/entity/:uuid",
  [verifyToken.run, verifyRole.run],
  deleteImageByentity.run
);

imageRouter.get("/random", new GetRandomImageController().run);
