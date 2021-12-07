import { Request, Response } from 'express';
import formidable from 'formidable';
import { container } from '../../..';
import { MenuFinder } from '../../../context/Menu/application/MenuFinder';
import { PlateCreator } from '../../../context/Plate/application/PlateCreator';
import { Plate, PlateObject } from '../../../context/Plate/domain/plate.model';
import { FileDeleter } from '../../../context/shared/application/fileDeleter';
import { HTTPException } from '../../../context/shared/domain/httpException';
import { errorHandler } from '../../../helpers/errorHandler';
import { enviroment } from '../../config/enviroment';
import { MenuUsesCasesInjector } from '../../dic/menuUsesCases.injector';
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

          const menuFinder: MenuFinder = container.get(
            MenuUsesCasesInjector.MenuFinder
          );
          const menu = await menuFinder.findByUuid(plateObject.menuUuid);
          const isValidDate = menu.date.isSameDay(new Date(plateObject.date));

          if (!isValidDate)
            throw new HTTPException(
              'invalid date',
              `day must be same than menu: ${menu.date.value}`,
              400
            );

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
