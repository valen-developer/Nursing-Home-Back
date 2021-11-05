import { Request, Response } from 'express';
import { container } from '../../..';
import { ActivityEliminator } from '../../../context/Activity/application/ActivityEliminator';
import { FileDeleter } from '../../../context/shared/application/fileDeleter';
import { errorHandler } from '../../../helpers/errorHandler';
import { enviroment } from '../../config/enviroment';
import { ActivityUsesCases } from '../../dic/activityUsesCases.injector';
import { UtilDependencies } from '../../dic/utils.inhector';

import { Controller } from '../controller.interface';

export class DeleteActivityController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { activity: uuid } = req.params;

    try {
      const activityDeleter: ActivityEliminator = container.get(
        ActivityUsesCases.ActivityDeleter
      );
      await activityDeleter.delete(uuid as string);

      const fileDeleter: FileDeleter = container.get(
        UtilDependencies.FileDeleter
      );
      const countFileDeleted = await fileDeleter.byNameMatch(
        enviroment.publicFolder,
        uuid as string
      );

      res.json({ ok: true });
    } catch (error) {
      errorHandler(res, error, 'delete activity controller');
    }
  }
}
