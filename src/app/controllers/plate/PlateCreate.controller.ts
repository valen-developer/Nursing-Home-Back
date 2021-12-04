import { Request, Response } from 'express';
import formidable from 'formidable';
import { container } from '../../..';
import { PlateCreator } from '../../../context/Plate/application/PlateCreator';
import { Plate, PlateObject } from '../../../context/Plate/domain/plate.model';
import { FileDeleter } from '../../../context/shared/application/fileDeleter';
import { errorHandler } from '../../../helpers/errorHandler';
import { enviroment } from '../../config/enviroment';
import { PlateUsesCases } from '../../dic/plateUsesCases.injector';
import { UtilDependencies } from '../../dic/utils.inhector';
import { Controller } from '../controller.interface';

export class PlateCreateController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const uploadDir = enviroment.publicFolder;

    const form = formidable({
      uploadDir,
      multiples: true,
    });

    try {
      form.parse(req, async (err, fields, files) => {
        try {
          if (err) throw new Error('server error');

          const plateObject = fields as unknown as PlateObject;

          const fileArray =
            files.file instanceof Array ? files.file : [files.file];

          const plate = new Plate(plateObject);

          const fileUploader = container.get(UtilDependencies.FileUploader);

          const imagePaths: string[] = await fileUploader.uploadAll(
            fileArray,
            plate.uuid.value,
            uploadDir
          );
          plate.setImages(imagePaths);

          const instalationCreator: PlateCreator = container.get(
            PlateUsesCases.PlateCreator
          );
          const fileDeleter: FileDeleter = container.get(
            UtilDependencies.FileDeleter
          );

          await instalationCreator.create(plate).catch((err) => {
            imagePaths.forEach((path) =>
              fileDeleter.byNameMatch(uploadDir, path)
            );

            throw err;
          });

          res.json({
            ok: true,
            plate: plate.toObject(),
          });
        } catch (error) {
          errorHandler(res, error, 'plate create controller');
        }
      });
    } catch (error) {
      errorHandler(res, error, 'plate create controller');
    }
  }
}
