import { Request, Response } from 'express';
import formidable from 'formidable';
import fs from 'fs';

import { container } from '../../..';
import { ActivityCreator } from '../../../context/Activity/application/ActivityCreator';
import { Activity } from '../../../context/Activity/domain/activity.model';
import { FileDeleter } from '../../../context/shared/application/fileDeleter';
import { FileUploader } from '../../../context/shared/domain/interfaces/fileUploader.interface';
import { IImageResizer } from '../../../context/shared/domain/interfaces/IimageResizer.interface';

import { errorHandler } from '../../../helpers/errorHandler';
import { enviroment } from '../../config/enviroment';
import { ActivityUsesCases } from '../../dic/activityUsesCases.injector';
import { UtilDependencies } from '../../dic/utils.inhector';
import { Controller } from '../controller.interface';

export class CreateActivityController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const destinationFolder = enviroment.publicFolder;
    console.log(
      '🚀 ~ file: CreateActivity.controller.ts ~ line 21 ~ CreateActivityController ~ run ~ destinationFolder',
      destinationFolder
    );

    const form = formidable({
      multiples: true,
      uploadDir: destinationFolder,
    });

    try {
      form.parse(req, async (err, fields, files) => {
        try {
          if (err) throw new Error('server error');

          const fileDeleter: FileDeleter = container.get(UtilDependencies.FileDeleter);

          const { activityUuid, name, description } = fields;

          const fileArray = files.file instanceof Array ? files.file : [files.file];

          // Instalation instance
          const activity = new Activity({
            uuid: activityUuid as string,
            description: description as string,
            name: name as string,
            imagePaths: [],
          });

          // save images
          const fileUploader: FileUploader = container.get(UtilDependencies.FileUploader);
          const imagePaths: string[] = await fileUploader.uploadAll(fileArray, activity.uuid.value, destinationFolder);

          activity.setImages(imagePaths);

          // Create instalation
          const activityCreator: ActivityCreator = container.get(ActivityUsesCases.ActivityCreator);
          await activityCreator.create(activity).catch((err) => {
            imagePaths.forEach((path) => fileDeleter.byNameMatch(destinationFolder, path));

            throw err;
          });

          res.json({ ok: true, activity: activity.toObject() });
        } catch (error) {
          errorHandler(res, error, 'create activity controller');
        }
      });
    } catch (error) {
      errorHandler(res, error, 'create activity controller');
    }
  }
}
