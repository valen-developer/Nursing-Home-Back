import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import path from 'path';
import { ParsedQs } from 'qs';
import { container } from '../../..';
import { InstalationFinder } from '../../../context/Instalation/application/InstalationFinder';
import { InstalationUpdater } from '../../../context/Instalation/application/InstalationUpdater';
import { FileDeleter } from '../../../context/shared/application/fileDeleter';
import { HTTPException } from '../../../context/shared/domain/httpException';
import { errorHandler } from '../../../helpers/errorHandler';
import { enviroment } from '../../config/enviroment';
import { InstalationUsesCases } from '../../dic/instalationUsesCases.injector';
import { UtilDependencies } from '../../dic/utils.inhector';
import { Controller } from '../controller.interface';

export class DeleteInstalationImageController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { instalationUuid: uuid, fileName } = req.body;

    console.log(fileName);

    try {
      const instalationFinder: InstalationFinder = container.get(
        InstalationUsesCases.InstalationFinder
      );
      const instalation = await instalationFinder.get(uuid);

      const images = instalation.imagePaths.map((i) => i.value);
      const existImageInInstalation = images.includes(fileName);

      if (!existImageInInstalation)
        throw new HTTPException('not image', 'image not found', 404);

      const filePath = path.join(enviroment.publicFolder, fileName);
      const fileDeleter: FileDeleter = container.get(
        UtilDependencies.FileDeleter
      );
      const isDeleted = fileDeleter.delete(filePath);

      if (!isDeleted) {
        res.status(404).json({ ok: false, error: 'not found' });
        return;
      }

      const newImagesPaths = images.filter((i) => i !== fileName);

      console.log(images);
      console.log(newImagesPaths);

      instalation.setImages(newImagesPaths);

      const instalationsUploader: InstalationUpdater = container.get(
        InstalationUsesCases.InstalationUpdater
      );
      await instalationsUploader.update(instalation);

      res.json({ ok: true });
    } catch (error) {
      errorHandler(res, error, 'delete instalation image controller');
    }
  }
}
