import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { container } from '../../..';
import { FileDeleter } from '../../../context/shared/application/fileDeleter';
import { ImageDeleter } from '../../../context/shared/application/imageDeleter';
import { errorHandler } from '../../../helpers/errorHandler';
import { Repositories } from '../../dic/repositories.injector';
import { UtilDependencies } from '../../dic/utils.inhector';
import { Controller } from '../controller.interface';

export class DeleteImageController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    try {
      const imageDeleter: ImageDeleter = container.get(
        UtilDependencies.ImageDeleter
      );

      await imageDeleter.delete(uuid);

      res.json({
        ok: true,
      });
    } catch (error) {
      errorHandler(res, error, 'image delete controller');
    }
  }
}
