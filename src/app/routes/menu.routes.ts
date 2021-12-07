import { Router } from 'express';
import { CreateMenuController } from '../controllers/menu/CreateMenu.controller';
import { DeleteMenuController } from '../controllers/menu/DeleteMenu.controller';
import { GetAllMenusController } from '../controllers/menu/GetAllMenus.controller';
import { GetMenuController } from '../controllers/menu/GetMenu.controller';
import { GetMenusByDateController } from '../controllers/menu/GetMenusByDate.controller';
import { UpdateMenuController } from '../controllers/menu/UpdateMenu.controller';
import { VerifyROLEMiddleware } from '../middlewares/verifyRole.middleware';
import { VerifyTokenMiddleware } from '../middlewares/verifyToken.middleware';

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
const getMenu = new GetMenuController();

menuRouter.post('/', [verifyToken.run, verifyRole.run], createMenu.run);
menuRouter.put('/:uuid', [verifyToken.run, verifyRole.run], updateMenu.run);
menuRouter.delete('/:uuid', [verifyToken.run, verifyRole.run], deleteMenu.run);

menuRouter.get(
  '/date/:date',
  [verifyToken.run, verifyRole.run],
  getMenuByDate.run
);
menuRouter.get('/all', [verifyToken.run, verifyRole.run], getAllMenu.run);
menuRouter.get('/:uuid', [verifyToken.run, verifyRole.run], getMenu.run);
