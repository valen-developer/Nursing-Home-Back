import { Request, Response } from 'express';
import { container } from '../../..';
import { UserFinder } from '../../../context/User/application/UserFinder';
import { UserUpdater } from '../../../context/User/application/UserUpdater';
import { errorHandler } from '../../../helpers/errorHandler';
import { UserUsesCases } from '../../dic/userUsesCases.injector';

import { Controller } from '../controller.interface';

export class ValidateUserController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { userUuid: uuid } = req.body;

    try {
      const userFinder: UserFinder = container.get(UserUsesCases.UserFinder);
      const user = await userFinder.getUser(uuid);

      user.validate();

      const userUpdater: UserUpdater = container.get(UserUsesCases.UserUpdater);
      await userUpdater.update(user);

      res.json({
        ok: true,
        user: user.toObjectWithoutPassword(),
      });
    } catch (error) {
      errorHandler(res, error, 'validate user controller');
    }
  }
}
