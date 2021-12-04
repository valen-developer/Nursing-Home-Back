import { Request, Response } from 'express';
import { container } from '../../..';
import { PlateFinder } from '../../../context/Plate/application/PlateFinder';
import { errorHandler } from '../../../helpers/errorHandler';
import { PlateUsesCases } from '../../dic/plateUsesCases.injector';

import { Controller } from '../controller.interface';

export class GetPlateController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    try {
      const plateFinder: PlateFinder = container.get(
        PlateUsesCases.PlateFinder
      );
      const plate = await plateFinder.findByUuid(uuid);

      res.status(200).json({
        ok: true,
        plate: plate.toObject(),
      });
    } catch (error) {
      errorHandler(res, error, 'get plate controller');
    }
  }
}
