import { Request, Response } from 'express';
import { container } from '../../..';
import { InstalationFinder } from '../../../context/Instalation/application/InstalationFinder';
import { InstalationUpdater } from '../../../context/Instalation/application/InstalationUpdater';
import { Instalation } from '../../../context/Instalation/domain/instalation.model';

import { errorHandler } from '../../../helpers/errorHandler';
import { InstalationUsesCases } from '../../dic/instalationUsesCases.injector';
import { Controller } from '../controller.interface';

export class UpdateInstalationController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { instalationUuid: uuid, name, description } = req.body;

    try {
      const instalationFinder: InstalationFinder = container.get(
        InstalationUsesCases.InstalationFinder
      );
      const instalation = await instalationFinder.get(uuid);

      const newInstalation = new Instalation({
        uuid: instalation.uuid.value,
        name,
        description,
        imagePaths: instalation.imagePaths.map((i) => i.value),
      });

      const instalationUpdater: InstalationUpdater = container.get(
        InstalationUsesCases.InstalationUpdater
      );
      await instalationUpdater.update(newInstalation);

      res.json({ ok: true });
    } catch (error) {
      errorHandler(res, error, 'update instalation controller');
    }
  }
}
