import { Request, Response } from 'express';
import { container } from '../../..';
import { UserFinder } from '../../../context/User/application/UserFinder';
import { errorHandler } from '../../../helpers/errorHandler';
import { UserUsesCases } from '../../dic/userUsesCases.injector';

import { Controller } from '../controller.interface';

export class GetUserController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.body;

    try {
      const userFinder: UserFinder = container.get(UserUsesCases.UserFinder);
      const user = await userFinder.getUser(uuid);

      res.json({
        ok: true,
        user: user.toObjectWithoutPassword(),
      });
    } catch (error) {
      errorHandler(res, error, 'get user controller');
    }
  }
}
