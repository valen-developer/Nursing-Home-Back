import { Request, Response } from 'express';

import { container } from '../../..';
import { UserFinder } from '../../../context/User/application/UserFinder';
import { errorHandler } from '../../../helpers/errorHandler';
import { UserUsesCases } from '../../dic/userUsesCases.injector';
import { Controller } from '../controller.interface';

export class GetUserByEmailController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { email } = req.params;

    try {
      const userFinder: UserFinder = container.get(UserUsesCases.UserFinder);

      const user = await userFinder.getByEmail(email);

      res.status(200).json({
        ok: true,
        user: user.toObjectWithoutPassword(),
      });
    } catch (error) {
      errorHandler(res, error, 'get user by email controller');
    }
  }
}
