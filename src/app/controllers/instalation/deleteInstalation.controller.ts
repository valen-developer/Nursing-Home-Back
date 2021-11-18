import { Request, Response } from 'express';
import { container } from '../../..';
import { InstalationEliminator } from '../../../context/Instalation/application/InstalationEliminator';
import { FileDeleter } from '../../../context/shared/application/fileDeleter';

import { errorHandler } from '../../../helpers/errorHandler';
import { enviroment } from '../../config/enviroment';
import { InstalationUsesCases } from '../../dic/instalationUsesCases.injector';
import { UtilDependencies } from '../../dic/utils.inhector';
import { Controller } from '../controller.interface';

export class DeleteInstalationController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { instalationUuid: uuid } = req.query;

    try {
      const instalationDeleter: InstalationEliminator = container.get(
        InstalationUsesCases.InstalationEliminator
      );
      await instalationDeleter.delete(uuid as string);

      res.json({ ok: true });
    } catch (error) {
      errorHandler(res, error, 'delete instalation controller');
    }
  }
}
