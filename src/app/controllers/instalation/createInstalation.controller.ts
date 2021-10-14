import { Request, Response } from 'express';
import formidable from 'formidable';
import path from 'path';
import { container } from '../../..';
import { InstalationCreator } from '../../../context/Instalation/application/InstalationCreator';
import { Instalation } from '../../../context/Instalation/domain/instalation.model';
import { FileUploader } from '../../../context/shared/domain/interfaces/fileUploader.interface';
import { asyncForEach } from '../../../helpers/asynForeach';
import { errorHandler } from '../../../helpers/errorHandler';
import { InstalationUsesCases } from '../../dic/instalationUsesCases.injector';
import { UtilDependencies } from '../../dic/utils.inhector';
import { Controller } from '../controller.interface';

export class CreateInstalationController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const destinationFolder = path.join(__dirname, '../../../..', 'public');

    const form = formidable({
      multiples: true,
      uploadDir: destinationFolder,
    });

    try {
      form.parse(req, async (err, fields, files) => {
        try {
          if (err) throw new Error('server error');

          const { instalationUuid, name, description } = fields;

          const fileArray = files.file as formidable.File[];
          const fileUploader: FileUploader = container.get(
            UtilDependencies.FileUploader
          );

          let imagePaths: string[] = [];

          await asyncForEach<formidable.File>(fileArray, async (f, i) => {
            const ipath: string = await fileUploader.upload(
              f,
              `${instalationUuid}-${i}`,
              destinationFolder
            );

            imagePaths.push(ipath);
            console.log('DENTRO DE ASYNC');
            console.log(imagePaths);
          });

          console.log('FUERA DE ASYNC');
          console.log(imagePaths);

          const instalationCreator: InstalationCreator = container.get(
            InstalationUsesCases.InstalationCreator
          );
          const instalation = new Instalation({
            uuid: instalationUuid as string,
            description: description as string,
            name: name as string,
            imagePaths,
          });

          await instalationCreator.create(instalation);

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
