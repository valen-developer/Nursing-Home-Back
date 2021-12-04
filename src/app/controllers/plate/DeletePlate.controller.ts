import { Request, Response } from 'express';
import { container } from '../../..';
import { PlateDeleter } from '../../../context/Plate/application/PlateDeleter';
import { errorHandler } from '../../../helpers/errorHandler';
import { PlateUsesCases } from '../../dic/plateUsesCases.injector';

import { Controller } from '../controller.interface';

export class DeletePlateController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    try {
      const plateDeleter: PlateDeleter = container.get(
        PlateUsesCases.PlateDeleter
      );

      await plateDeleter.deletePlate(uuid);

      res.status(200).json({
        ok: true,
      });
    } catch (error) {
      errorHandler(res, error, 'delete plate controller');
    }
  }
}
