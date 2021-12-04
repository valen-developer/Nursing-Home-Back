import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { container } from '../../..';
import { UserFinder } from '../../../context/User/application/UserFinder';
import { UserUpdater } from '../../../context/User/application/UserUpdater';
import { errorHandler } from '../../../helpers/errorHandler';
import { UserUsesCases } from '../../dic/userUsesCases.injector';
import { Controller } from '../controller.interface';

export class TurnUserAdminController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    try {
      const userFinder: UserFinder = container.get(UserUsesCases.UserFinder);
      const user = await userFinder.getUser(uuid);

      user.turnAdminRole();

      const userUpdater: UserUpdater = container.get(UserUsesCases.UserUpdater);
      await userUpdater.update(user);

      res.json({
        ok: true,
      });
    } catch (error) {
      errorHandler(res, error, 'turn user admin controller');
    }
  }
}
