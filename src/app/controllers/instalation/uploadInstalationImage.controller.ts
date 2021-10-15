import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import formidable from 'formidable';
import { ParsedQs } from 'qs';
import { container } from '../../..';
import { InstalationFinder } from '../../../context/Instalation/application/InstalationFinder';
import { InstalationUpdater } from '../../../context/Instalation/application/InstalationUpdater';
import { FileUploader } from '../../../context/shared/domain/interfaces/fileUploader.interface';
import { asyncForEach } from '../../../helpers/asynForeach';
import { errorHandler } from '../../../helpers/errorHandler';
import { enviroment } from '../../config/enviroment';
import { InstalationUsesCases } from '../../dic/instalationUsesCases.injector';
import { UtilDependencies } from '../../dic/utils.inhector';
import { Controller } from '../controller.interface';

export class UploadInstalationImageController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const form = formidable({
      multiples: true,
      uploadDir: enviroment.publicFolder,
    });

    form.parse(req, async (err, fields, filesObject) => {
      try {
        const { instalationUuid: uuid } = fields;
        const files = filesObject.file;
        const fileArray = files instanceof Array ? files : [files];

        const instalationFinder: InstalationFinder = container.get(
          InstalationUsesCases.InstalationFinder
        );
        const instalation = await instalationFinder.get(uuid as string);

        const fileUploader: FileUploader = container.get(
          UtilDependencies.FileUploader
        );

        let imagePaths = instalation.imagePaths.map((i) => i.value);

        await asyncForEach(fileArray, async (f, i) => {
          const ipath = await fileUploader.upload(
            f,
            `${uuid}-${imagePaths.length}`,
            enviroment.publicFolder
          );
          if (ipath) imagePaths.push(ipath);
        });

        instalation.setImages(imagePaths);

        const instalationUpdater: InstalationUpdater = container.get(
          InstalationUsesCases.InstalationUpdater
        );
        await instalationUpdater.update(instalation);

        res.json({ ok: true });
      } catch (error) {
        errorHandler(res, error, 'upload intalation image controller');
      }
    });
  }
}
