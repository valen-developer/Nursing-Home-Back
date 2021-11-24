import { Request, Response } from 'express';
import formidable from 'formidable';
import fs from 'fs';

import { container } from '../../..';
import { ActivityFinder } from '../../../context/Activity/application/ActivityFinder';
import { ActivityUpdater } from '../../../context/Activity/application/ActivityUpdater';
import { Activity } from '../../../context/Activity/domain/activity.model';
import { FileUploader } from '../../../context/shared/domain/interfaces/fileUploader.interface';
import { errorHandler } from '../../../helpers/errorHandler';
import { enviroment } from '../../config/enviroment';
import { ActivityUsesCases } from '../../dic/activityUsesCases.injector';
import { UtilDependencies } from '../../dic/utils.inhector';

import { Controller } from '../controller.interface';

export class UpdateActivityController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    const destinationFolder = enviroment.publicFolder;

    const form = formidable({
      uploadDir: destinationFolder,
      multiples: true,
    });

    try {
      form.parse(req, async (err, fields, files) => {
        try {
          if (err) throw new Error('server error');

          // get dependencies
          const activityFinder: ActivityFinder = container.get(
            ActivityUsesCases.ActivityFinder
          );
          const fileUploader: FileUploader = container.get(
            UtilDependencies.FileUploader
          );
          const activityUpdater: ActivityUpdater = container.get(
            ActivityUsesCases.ActivityUpdater
          );

          const { name, description } = fields;

          const fileArray =
            files?.file instanceof Array ? files?.file : [files?.file];

          const activity = await activityFinder.getByUuid(uuid as string);
          const updatedActivity = new Activity({
            uuid: activity.uuid.value,
            name: name as string,
            description: description as string,
            imagePaths: [],
          });

          const imagePaths: string[] = await fileUploader.uploadAll(
            fileArray,
            updatedActivity.uuid.value,
            destinationFolder
          );

          updatedActivity.setImages(imagePaths);

          await activityUpdater.update(updatedActivity).catch((err) => {
            imagePaths.forEach((path) => fs.unlinkSync(path));

            throw err;
          });

          res.json({ ok: true, activity: updatedActivity.toObject() });
        } catch (error) {
          errorHandler(res, error, 'update activity controller');
        }
      });
    } catch (error) {
      console.log('🚀 -> UpdateActivityController -> run -> error', error);
      errorHandler(res, error, 'update activity controller');
    }
  }
}
