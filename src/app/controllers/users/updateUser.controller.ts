import { Request, Response } from 'express';
import formidable from 'formidable';
import { container } from '../../..';
import { FileDeleter } from '../../../context/shared/application/fileDeleter';
import { ImageDeleter } from '../../../context/shared/application/imageDeleter';
import { FileUploader } from '../../../context/shared/domain/interfaces/fileUploader.interface';
import { UserFinder } from '../../../context/User/application/UserFinder';
import { UserUpdater } from '../../../context/User/application/UserUpdater';
import { User } from '../../../context/User/domain/user.model';
import { errorHandler } from '../../../helpers/errorHandler';
import { enviroment } from '../../config/enviroment';
import { UserUsesCases } from '../../dic/userUsesCases.injector';
import { UtilDependencies } from '../../dic/utils.inhector';
import { Controller } from '../controller.interface';

export class UpdateUserController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.body;

    const destinationFolder = enviroment.publicFolder;

    const form = formidable({
      uploadDir: destinationFolder,
      multiples: true,
      keepExtensions: true,
    });

    try {
      form.parse(req, async (err, fields, files) => {
        if (err) throw new Error('server error');

        try {
          // dependencies
          const userFinder: UserFinder = container.get(
            UserUsesCases.UserFinder
          );
          const userUpdater: UserUpdater = container.get(
            UserUsesCases.UserUpdater
          );

          const fileUploader: FileUploader = container.get(
            UtilDependencies.FileUploader
          );
          const fileDeleter: FileDeleter = container.get(
            UtilDependencies.FileDeleter
          );
          const imageDeleter: ImageDeleter = container.get(
            UtilDependencies.ImageDeleter
          );

          const { name, email } = fields;
          const file = files.file instanceof Array ? files.file[0] : files.file;

          // find user
          const user = await userFinder.getUser(uuid);

          // delete old image
          if (user.image)
            await imageDeleter.deleteByEntityUuid(
              user.uuid.value,
              destinationFolder
            );

          const imagePath = await fileUploader.upload(
            file,
            user.uuid.value,
            destinationFolder
          );

          const updatedUser = new User({
            uuid: user.uuid.value,
            name: name as string,
            email: email as string,
            image: imagePath,
            role: user.role.value,
            validated: user.validated,
          });

          await userUpdater.update(updatedUser).catch((err) => {
            fileDeleter.byNameMatch(destinationFolder, imagePath);
            throw err;
          });

          res.json({
            ok: true,
            user: updatedUser.toObjectWithoutPassword(),
          });
        } catch (error) {
          errorHandler(res, error, 'update user controller');
        }
      });
    } catch (error) {
      errorHandler(res, error, 'update user controller');
    }
  }
}
