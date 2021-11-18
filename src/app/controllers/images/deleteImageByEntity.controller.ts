import { Request, Response } from 'express';

import { container } from '../../..';
import { ImageDeleter } from '../../../context/shared/application/imageDeleter';
import { errorHandler } from '../../../helpers/errorHandler';
import { UtilDependencies } from '../../dic/utils.inhector';
import { Controller } from '../controller.interface';

export class DeleteImageByEntityController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    try {
      const imageDeleter: ImageDeleter = container.get(
        UtilDependencies.ImageDeleter
      );

      await imageDeleter.deleteByEntityUuid(uuid);

      res.json({
        ok: true,
      });
    } catch (error) {
      errorHandler(res, error, 'image delete controller');
    }
  }
}
