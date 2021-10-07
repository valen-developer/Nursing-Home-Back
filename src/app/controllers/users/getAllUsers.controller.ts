import { Request, Response } from 'express';

import { container } from '../../..';
import { UserFinder } from '../../../context/User/application/UserFinder';
import { errorHandler } from '../../../helpers/errorHandler';
import { UserUsesCases } from '../../dic/userUsesCases.injector';
import { Controller } from '../controller.interface';

export class GetAllUsersController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    try {
      const userFinder: UserFinder = container.get(UserUsesCases.UserFinder);
      const users = await userFinder.getAll();

      res.json({
        ok: true,
        users: users.map((u) => u.toObjectWithoutPassword()),
      });
    } catch (error) {
      errorHandler(res, error, 'get all users controller');
    }
  }
}
