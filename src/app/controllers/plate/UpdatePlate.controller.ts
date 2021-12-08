import { Request, Response } from 'express';
import formidable from 'formidable';
import { container } from '../../..';
import { PlateFinder } from '../../../context/Plate/application/PlateFinder';
import { PlateUpdater } from '../../../context/Plate/application/PlateUpdater';
import { Plate, PlateObject } from '../../../context/Plate/domain/plate.model';
import { FileDeleter } from '../../../context/shared/application/fileDeleter';
import { FileUploader } from '../../../context/shared/domain/interfaces/fileUploader.interface';
import { errorHandler } from '../../../helpers/errorHandler';
import { enviroment } from '../../config/enviroment';
import { PlateUsesCases } from '../../dic/plateUsesCases.injector';
import { UtilDependencies } from '../../dic/utils.inhector';

import { Controller } from '../controller.interface';

export class UpdatePlateController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    const uploadDir = enviroment.publicFolder;
    const form = formidable({
      uploadDir,
      multiples: true,
    });

    try {
      form.parse(req, async (err, fields, files) => {
        if (err) throw new Error('server error');

        // Dependencies
        const plateFinder: PlateFinder = container.get(
          PlateUsesCases.PlateFinder
        );
        const plateUpdater: PlateUpdater = container.get(
          PlateUsesCases.PlateUpdater
        );
        const fileUploader: FileUploader = container.get(
          UtilDependencies.FileUploader
        );
        const fileDeleter: FileDeleter = container.get(
          UtilDependencies.FileDeleter
        );

        const plateObject = fields as unknown as PlateObject;

        const fileArray =
          files.file instanceof Array ? files.file : [files.file];

        const plate = await plateFinder.findByUuid(uuid);
        const updatedPlate = new Plate({
          uuid: plate.uuid.value,
          menuUuid: plate.menuUuid.value,
          name: plateObject.name,
          description: plateObject.description,
          date: plateObject.date,
          receipe: plateObject.receipe,
          imagePaths: plate.imagePaths,
        });

        const imagesPath = await fileUploader.uploadAll(
          fileArray,
          plate.uuid.value,
          uploadDir
        );

        plate.setImages([...plate.imagePaths, ...imagesPath]);

        await plateUpdater.updatePlate(updatedPlate).catch((err) => {
          imagesPath.forEach((path) =>
            fileDeleter.byNameMatch(uploadDir, path)
          );
          throw err;
        });

        res.json({
          ok: true,
          job: updatedPlate.toObject(),
        });
      });
    } catch (error) {
      errorHandler(res, error, 'update plate controller');
    }
  }
}
