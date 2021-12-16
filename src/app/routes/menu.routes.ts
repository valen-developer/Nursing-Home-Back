import { Router } from "express";
import { CreateMenuController } from "../controllers/menu/CreateMenu.controller";
import { DeleteMenuController } from "../controllers/menu/DeleteMenu.controller";
import { DuplicateMenuByDateController } from "../controllers/menu/DuplicateMenuByDate.controller";
import { GetAllMenusController } from "../controllers/menu/GetAllMenus.controller";
import { GetMenuController } from "../controllers/menu/GetMenu.controller";
import { GetMenusByDateController } from "../controllers/menu/GetMenusByDate.controller";
import { GetMenusByMonthController } from "../controllers/menu/GetMenusByMonth.controller";
import { UpdateMenuController } from "../controllers/menu/UpdateMenu.controller";
import { VerifyROLEMiddleware } from "../middlewares/verifyRole.middleware";
import { VerifyTokenMiddleware } from "../middlewares/verifyToken.middleware";

export const menuRouter = Router();

// Middlewares
const verifyToken = new VerifyTokenMiddleware();
const verifyRole = new VerifyROLEMiddleware();

// Controllers
const createMenu = new CreateMenuController();
const updateMenu = new UpdateMenuController();
const deleteMenu = new DeleteMenuController();
const getAllMenu = new GetAllMenusController();
const getMenuByDate = new GetMenusByDateController();
const getMenusByMonth = new GetMenusByMonthController();
const getMenu = new GetMenuController();
const duplicateMenuByDate = new DuplicateMenuByDateController();

menuRouter.post("/", [verifyToken.run, verifyRole.run], createMenu.run);
menuRouter.post(
  "/duplicate",
  [verifyToken.run, verifyRole.run],
  duplicateMenuByDate.run
);
menuRouter.put("/:uuid", [verifyToken.run, verifyRole.run], updateMenu.run);
menuRouter.delete("/:uuid", [verifyToken.run, verifyRole.run], deleteMenu.run);

menuRouter.get("/date/:date", getMenuByDate.run);
menuRouter.get("/month/:date", getMenusByMonth.run);
menuRouter.get("/all", getAllMenu.run);
menuRouter.get("/:uuid", getMenu.run);
