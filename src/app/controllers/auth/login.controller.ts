import { Request, Response } from 'express';

import { container } from '../../..';
import { enviroment } from '../../config/enviroment';
import { errorHandler } from '../../../helpers/errorHandler';

import { UtilDependencies } from '../../dic/utils.inhector';
import { JWT } from '../../../context/shared/infrastructure/jsonwebtoken.jwt';

import { UserUsesCases } from '../../dic/userUsesCases.injector';
import { LoginUser } from '../../../context/User/application/LoginUser';
import { Controller } from '../controller.interface';

export class LoginController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const userLogger: LoginUser = container.get(UserUsesCases.LoginUser);
      const user = await userLogger.login(email, password);

      const jwt: JWT = container.get(UtilDependencies.JWT);
      const token = jwt.sign({ uuid: user.uuid.value }, enviroment.token.seed, {
        expiresIn: enviroment.token.expireIn,
      });

      res.json({
        ok: true,
        user: user.toObjectWithoutPassword(),
        token,
      });
    } catch (error) {
      errorHandler(res, error, 'login controller');
    }
  }
}
