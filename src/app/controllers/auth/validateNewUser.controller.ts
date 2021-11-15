import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
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

export class ValidateNewUserController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    let { uuid, password } = req.body;

    try {
      const userFinder: UserFinder = container.get(UserUsesCases.UserFinder);
      let user = await userFinder.getUser(uuid);

      ValidateNewUserController.checkPassword(password);

      const crypt: ICrypt = container.get(UtilDependencies.Crypt);
      const encryptPassword = crypt.hash(password, 10);

      user = new User({ ...user.toObject(), password: encryptPassword });
      user.validate();

      const userUpdater: UserUpdater = container.get(UserUsesCases.UserUpdater);
      await userUpdater.update(user);

      res.json({
        ok: true,
      });
    } catch (error) {
      console.log(error);

      errorHandler(res, error, 'validate user controller');
    }
  }

  public static checkPassword(password: string): void {
    if (!UserPassword.isValidPassword(password))
      throw new HTTPException(
        'validate user controller',
        'invalid password',
        400
      );
  }
}
