import { Request, Response } from 'express';
import { container } from '../../..';
import { PlateFinder } from '../../../context/Plate/application/PlateFinder';
import { errorHandler } from '../../../helpers/errorHandler';
import { PlateUsesCases } from '../../dic/plateUsesCases.injector';

import { Controller } from '../controller.interface';

export class GetPlatesController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    try {
      const plateFinder: PlateFinder = container.get(
        PlateUsesCases.PlateFinder
      );
      const plates = await plateFinder.findAll();

      res.json({
        ok: true,
        plates: plates.map((plate) => plate.toObject()),
      });
    } catch (error) {
      errorHandler(res, error, 'get plates controller');
    }
  }
}
