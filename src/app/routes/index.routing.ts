import { Router } from "express";
import { activityRouter } from "./activity.routes";
import { authRouter } from "./auth.routes";
import { generalRoutes } from "./general.routes";
import { imageRouter } from "./image.routes";
import { instalationRouter } from "./instalation.routes";
import { jobRouter } from "./job.routes";
import { menuRouter } from "./menu.routes";
import { newsRouter } from "./news.routes";
import { plateRouter } from "./plate.routes";
import { userRouter } from "./user.routes";

export const router = Router();

router.use("/user", authRouter);
router.use("/user", userRouter);
router.use("/instalation", instalationRouter);
router.use("/job", jobRouter);
router.use("/activity", activityRouter);
router.use("/image", imageRouter);
router.use("/menu", menuRouter);
router.use("/plate", plateRouter);
router.use("/news", newsRouter);

router.use("", generalRoutes);
