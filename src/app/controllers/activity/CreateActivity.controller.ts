import { Request, Response } from 'express';
import formidable from 'formidable';
import fs from 'fs';

import { container } from '../../..';
import { ActivityCreator } from '../../../context/Activity/application/ActivityCreator';
import { ActivityUpdater } from '../../../context/Activity/application/ActivityUpdater';
import { Activity } from '../../../context/Activity/domain/activity.model';
import { FileUploader } from '../../../context/shared/domain/interfaces/fileUploader.interface';
import { asyncForEach } from '../../../helpers/asynForeach';

import { errorHandler } from '../../../helpers/errorHandler';
import { enviroment } from '../../config/enviroment';
import { ActivityUsesCases } from '../../dic/activityUsesCases.injector';
import { UtilDependencies } from '../../dic/utils.inhector';
import { Controller } from '../controller.interface';

export class CreateActivityController implements Controller {
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

          const { activityUuid, name, description } = fields;

          const fileArray =
            files.file instanceof Array ? files.file : [files.file];

          // Instalation instance
          const activity = new Activity({
            uuid: activityUuid as string,
            description: description as string,
            name: name as string,
            imagePath: [],
          });

          // Create instalation
          const activityCreator: ActivityCreator = container.get(
            ActivityUsesCases.ActivityCreator
          );
          await activityCreator.create(activity).catch((err) => {
            fileArray.forEach((f) => fs.unlinkSync(f.path));

            throw err;
          });

          // save images
          const fileUploader: FileUploader = container.get(
            UtilDependencies.FileUploader
          );
          let imagePaths: string[] = [];
          await asyncForEach<formidable.File>(fileArray, async (f, i) => {
            const ipath: string = await fileUploader.upload(
              f,
              `${activityUuid}-${i}`,
              destinationFolder
            );

            if (ipath) imagePaths.push(ipath);
          });

          // update images
          activity.setImages(imagePaths);

          const activityUpdater: ActivityUpdater = container.get(
            ActivityUsesCases.ActivityUpdater
          );
          await activityUpdater.update(activity);

          res.json({ ok: true });
        } catch (error) {
          errorHandler(res, error, 'create activity controller');
        }
      });
    } catch (error) {
      errorHandler(res, error, 'create activity controller');
    }
  }
}
