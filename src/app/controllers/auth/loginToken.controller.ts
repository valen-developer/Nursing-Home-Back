import { Request, Response } from 'express';

import { container } from '../../..';
import { LoginToken } from '../../../context/User/application/LoginToken';
import { errorHandler } from '../../../helpers/errorHandler';
import { UserUsesCases } from '../../dic/userUsesCases.injector';
import { Controller } from '../controller.interface';

export class LoginTokenController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.body;

    try {
      const loginToken: LoginToken = container.get(
        UserUsesCases.LoginUserToken
      );
      const user = await loginToken.login(uuid);

      res.json({
        ok: true,
        user: user.toObjectWithoutPassword(),
      });
    } catch (error) {
      errorHandler(res, error, 'login token controller');
    }
  }
}
