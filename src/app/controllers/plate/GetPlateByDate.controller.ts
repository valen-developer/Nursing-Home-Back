import { Request, Response } from 'express';
import { container } from '../../..';
import { PlateFinder } from '../../../context/Plate/application/PlateFinder';
import { errorHandler } from '../../../helpers/errorHandler';
import { PlateUsesCases } from '../../dic/plateUsesCases.injector';

import { Controller } from '../controller.interface';

export class GetPlateByDateController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { date } = req.params;

    try {
      const dateObject = new Date(date);
      const plateFinder: PlateFinder = container.get(
        PlateUsesCases.PlateFinder
      );
      const plates = await plateFinder.findByDate(dateObject);

      res.status(200).json({
        ok: true,
        plates: plates.map((plate) => plate.toObject()),
      });
    } catch (error) {
      errorHandler(res, error, 'get plate by date controller');
    }
  }
}
