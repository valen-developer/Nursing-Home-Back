import { Request, Response } from 'express';
import { container } from '../../..';
import { InstalationEliminator } from '../../../context/Instalation/application/InstalationEliminator';

import { errorHandler } from '../../../helpers/errorHandler';
import { InstalationUsesCases } from '../../dic/instalationUsesCases.injector';
import { Controller } from '../controller.interface';

export class DeleteInstalationController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { instalationUuid: uuid } = req.body;

    try {
      const instalationDeleter: InstalationEliminator = container.get(
        InstalationUsesCases.InstalationEliminator
      );
      await instalationDeleter.delete(uuid);

      res.json({ ok: true });
    } catch (error) {
      errorHandler(res, error, 'delete instalation controller');
    }
  }
}
