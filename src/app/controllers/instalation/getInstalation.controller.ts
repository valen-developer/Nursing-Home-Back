import { Request, Response } from 'express';
import { container } from '../../..';
import { InstalationFinder } from '../../../context/Instalation/application/InstalationFinder';
import { errorHandler } from '../../../helpers/errorHandler';
import { InstalationUsesCases } from '../../dic/instalationUsesCases.injector';
import { Controller } from '../controller.interface';

export class GetInstalationController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { instalationUuid: uuid } = req.body;

    try {
      const instalationFinder: InstalationFinder = container.get(
        InstalationUsesCases.InstalationFinder
      );
      const instalation = await instalationFinder.get(uuid);

      res.json({
        ok: true,
        instalation: instalation.toObject(),
      });
    } catch (error) {
      errorHandler(res, error, 'get all instalation controller');
    }
  }
}
