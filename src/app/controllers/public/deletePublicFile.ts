import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import path from 'path';
import { ParsedQs } from 'qs';
import { container } from '../../..';
import { FileDeleter } from '../../../context/shared/application/fileDeleter';
import { errorHandler } from '../../../helpers/errorHandler';
import { enviroment } from '../../config/enviroment';
import { UtilDependencies } from '../../dic/utils.inhector';
import { Controller } from '../controller.interface';

export class DeletePublicFileController implements Controller {
  public run(req: Request, res: Response): void {
    const { fileName } = req.body;

    try {
      const filePath = path.join(enviroment.publicFolder, fileName);
      const fileDeleter: FileDeleter = container.get(
        UtilDependencies.FileDeleter
      );
      const existAndDeleted = fileDeleter.delete(filePath);

      if (!existAndDeleted) {
        res.status(404).json({
          ok: false,
          error: 'file not found',
        });

        return;
      }

      res.json({
        ok: true,
      });
    } catch (error) {
      errorHandler(res, error, 'delete public file controller');
    }
  }
}
