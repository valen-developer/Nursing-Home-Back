import { Request, Response } from 'express';
import formidable from 'formidable';
import path from 'path';
import { container } from '../../..';
import { FileUploader } from '../../../context/shared/domain/interfaces/fileUploader.interface';
import { UserFinder } from '../../../context/User/application/UserFinder';
import { UserUpdater } from '../../../context/User/application/UserUpdater';
import { errorHandler } from '../../../helpers/errorHandler';
import { enviroment } from '../../config/enviroment';
import { UserUsesCases } from '../../dic/userUsesCases.injector';
import { UtilDependencies } from '../../dic/utils.inhector';

import { Controller } from '../controller.interface';

export class UpdateUserImageController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.body;

    const destinationFolder = path.join(enviroment.fileFolderPath, 'users');

    const form = formidable({
      multiples: false,
      uploadDir: destinationFolder,
    });

    form.parse(req, async (err, fields, files) => {
      try {
        if (err) throw new Error('server error');

        const file = files.file as formidable.File;
        const userFinder: UserFinder = container.get(UserUsesCases.UserFinder);

        console.log(uuid);

        const user = await userFinder.getUser(uuid);

        const fileUploader: FileUploader = container.get(
          UtilDependencies.FileUploader
        );

        const imagePath = await fileUploader.upload(
          file,
          uuid,
          destinationFolder
        );

        user.setImagePath(imagePath);

        const userUpdater: UserUpdater = container.get(
          UserUsesCases.UserUpdater
        );

        await userUpdater.update(user);

        res.json({ ok: true });
      } catch (error) {
        errorHandler(res, error, 'update image user controller');
      }
    });
  }
}
