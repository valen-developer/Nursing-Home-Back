import { Request, Response } from 'express';
import { container } from '../../..';
import { HTTPException } from '../../../context/shared/domain/httpException';
import { ICrypt } from '../../../context/shared/domain/interfaces/crypt.interface';
import { UserFinder } from '../../../context/User/application/UserFinder';
import { UserUpdater } from '../../../context/User/application/UserUpdater';
import { User } from '../../../context/User/domain/user.model';
import { UserPassword } from '../../../context/User/domain/valueObject/UserPassword.valueObject';
import { errorHandler } from '../../../helpers/errorHandler';
import { UserUsesCases } from '../../dic/userUsesCases.injector';
import { UtilDependencies } from '../../dic/utils.inhector';
import { Controller } from '../controller.interface';

export class ChangePasswordController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid, password } = req.body;

    try {
      const isValidPassword = UserPassword.isValidPassword(password);

      if (!isValidPassword) {
        throw new HTTPException(
          'change password controller',
          'invalid password',
          400
        );
      }

      const userFinder: UserFinder = container.get(UserUsesCases.UserFinder);
      const crypt: ICrypt = container.get(UtilDependencies.Crypt);
      const user = await userFinder.getUser(uuid);

      const newUser = new User(
        user.uuid.value,
        user.name.value,
        user.email.value,
        crypt.hash(password, 10),
        user.role.value,
        user.validated
      );

      const userUpdater: UserUpdater = container.get(UserUsesCases.UserUpdater);
      userUpdater.update(newUser);

      res.status(200).json({ ok: true });
    } catch (error) {
      errorHandler(res, error, 'change password controller');
    }
  }
}
