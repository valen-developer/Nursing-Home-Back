import { Request, Response } from 'express';
import { container } from '../../..';
import { InstalationFinder } from '../../../context/Instalation/application/InstalationFinder';
import { errorHandler } from '../../../helpers/errorHandler';
import { InstalationUsesCases } from '../../dic/instalationUsesCases.injector';
import { Controller } from '../controller.interface';

export class GetAllInstalationController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    try {
      const instalationFinder: InstalationFinder = container.get(
        InstalationUsesCases.InstalationFinder
      );
      const instalations = await instalationFinder.getAll();

      res.json({
        ok: true,
        instalations: instalations.map((i) => i.toObject()),
      });
    } catch (error) {
      errorHandler(res, error, 'get all instalation controller');
    }
  }
}
