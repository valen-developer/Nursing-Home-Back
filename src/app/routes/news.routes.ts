import { Router } from "express";
import { CreateNewsController } from "../controllers/news/CreateNews.controller";
import { DeleteNewsController } from "../controllers/news/DeleteNews.controller";
import { GetAllNewsController } from "../controllers/news/GetAllNews.controller";
import { GetNewController } from "../controllers/news/GetNew.controller";
import { GetPublishedNewsController } from "../controllers/news/GetPublishedNews.controller";
import { PublishNewsController } from "../controllers/news/PublishNews.controller";
import { UnPublishNewsController } from "../controllers/news/UnPublishNews.controller";
import { UpdateNewsController } from "../controllers/news/UpdateNews.controller";
import { VerifyROLEMiddleware } from "../middlewares/verifyRole.middleware";
import { VerifyTokenMiddleware } from "../middlewares/verifyToken.middleware";

export const newsRouter = Router();

// Middleware
const verifyToken = new VerifyTokenMiddleware();
const verifyRole = new VerifyROLEMiddleware();

// Controllers
const createNews = new CreateNewsController();
const updateNews = new UpdateNewsController();
const deleteNews = new DeleteNewsController();
const getNews = new GetNewController();
const getAllNews = new GetAllNewsController();
const publishNews = new PublishNewsController();
const unPublishNews = new UnPublishNewsController();

// Routes
newsRouter.post("/", [verifyToken.run, verifyRole.run], createNews.run);
newsRouter.put("/:uuid", [verifyToken.run, verifyRole.run], updateNews.run);
newsRouter.delete("/:uuid", [verifyToken.run, verifyRole.run], deleteNews.run);

newsRouter.get("/all", getAllNews.run);
newsRouter.get("/published", new GetPublishedNewsController().run);
newsRouter.get("/:uuid", getNews.run);

newsRouter.post(
  "/:uuid/publish",
  [verifyToken.run, verifyRole.run],
  publishNews.run
);
newsRouter.post(
  "/:uuid/unpublish",
  [verifyToken.run, verifyRole.run],
  unPublishNews.run
);
