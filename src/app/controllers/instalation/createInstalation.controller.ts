import { Request, Response } from 'express';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';

import { container } from '../../..';
import { InstalationCreator } from '../../../context/Instalation/application/InstalationCreator';
import { Instalation } from '../../../context/Instalation/domain/instalation.model';
import { FileUploader } from '../../../context/shared/domain/interfaces/fileUploader.interface';
import { asyncForEach } from '../../../helpers/asynForeach';
import { errorHandler } from '../../../helpers/errorHandler';
import { InstalationUsesCases } from '../../dic/instalationUsesCases.injector';
import { UtilDependencies } from '../../dic/utils.inhector';
import { Controller } from '../controller.interface';
import { InstalationUpdater } from '../../../context/Instalation/application/InstalationUpdater';
import { enviroment } from '../../config/enviroment';

export class CreateInstalationController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const destinationFolder = enviroment.publicFolder;

    const form = formidable({
      multiples: true,
      uploadDir: destinationFolder,
    });

    try {
      form.parse(req, async (err, fields, files) => {
        try {
          if (err) throw new Error('server error');

          const { instalationUuid, name, description } = fields;

          const fileArray =
            files.file instanceof Array ? files.file : [files.file];

          // Instalation instance
          const instalation = new Instalation({
            uuid: instalationUuid as string,
            description: description as string,
            name: name as string,
            imagePaths: [],
          });

          // save images
          const fileUploader: FileUploader = container.get(
            UtilDependencies.FileUploader
          );

          const imagePaths: string[] = await fileUploader.uploadAll(
            fileArray,
            instalation.uuid.value,
            destinationFolder
          );
          instalation.setImages(imagePaths);

          // Create instalation
          const instalationCreator: InstalationCreator = container.get(
            InstalationUsesCases.InstalationCreator
          );
          await instalationCreator.create(instalation).catch((err) => {
            fileArray.forEach((f) => fs.unlinkSync(f.path));

            throw err;
          });

          res.json({ ok: true });
        } catch (error) {
          errorHandler(res, error, 'create instalation controller');
        }
      });
    } catch (error) {
      errorHandler(res, error, 'create instalation controller');
    }
  }
}
