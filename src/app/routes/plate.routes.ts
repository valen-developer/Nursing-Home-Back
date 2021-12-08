import { Router } from 'express';
import { DeletePlateController } from '../controllers/plate/DeletePlate.controller';
import { GetPlateController } from '../controllers/plate/GetPlate.controller';
import { GetPlateByDateController } from '../controllers/plate/GetPlateByDate.controller';
import { GetPlatesController } from '../controllers/plate/GetPlates.controller';
import { GetPlatesByMenuController } from '../controllers/plate/GetPlatesByMenu.controller';
import { PlateCreateController } from '../controllers/plate/PlateCreate.controller';
import { UpdatePlateController } from '../controllers/plate/UpdatePlate.controller';
import { VerifyROLEMiddleware } from '../middlewares/verifyRole.middleware';
import { VerifyTokenMiddleware } from '../middlewares/verifyToken.middleware';

export const plateRouter = Router();

// Middlewares
const verifyToken = new VerifyTokenMiddleware();
const verifyRole = new VerifyROLEMiddleware();

// Controllers
const createPlate = new PlateCreateController();
const updatePlate = new UpdatePlateController();
const deletePlate = new DeletePlateController();
const getPlates = new GetPlatesController();
const getPlate = new GetPlateController();
const getPlatesByDate = new GetPlateByDateController();
const getPlatesByMenu = new GetPlatesByMenuController();

plateRouter.post('/', [verifyToken.run, verifyRole.run], createPlate.run);
plateRouter.put('/:uuid', [verifyToken.run, verifyRole.run], updatePlate.run);
plateRouter.delete(
  '/:uuid',
  [verifyToken.run, verifyRole.run],
  deletePlate.run
);

plateRouter.get('/all', getPlates.run);
plateRouter.get('/:uuid', getPlate.run);
plateRouter.get('/date/:date', getPlatesByDate.run);
plateRouter.get('/menu/:uuid', getPlatesByMenu.run);
