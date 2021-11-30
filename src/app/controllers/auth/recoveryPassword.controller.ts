import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { container } from '../../..';
import { HTTPException } from '../../../context/shared/domain/httpException';
import { Mailer } from '../../../context/shared/domain/interfaces/mailer.interface';
import { JWT } from '../../../context/shared/infrastructure/jsonwebtoken.jwt';
import { UserFinder } from '../../../context/User/application/UserFinder';
import { errorHandler } from '../../../helpers/errorHandler';
import { enviroment } from '../../config/enviroment';
import { UserUsesCases } from '../../dic/userUsesCases.injector';
import { UtilDependencies } from '../../dic/utils.inhector';
import { Controller } from '../controller.interface';

export class RecoveryPasswordController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    try {
      const userfinder: UserFinder = container.get(UserUsesCases.UserFinder);
      const user = await userfinder.getByEmail(email);
      console.log('🚀 -> RecoveryPasswordController -> run -> user', user);
      const jwt: JWT = container.get(UtilDependencies.JWT);

      const token = jwt.sign({ uuid: user.uuid.value }, enviroment.token.seed, {
        expiresIn: enviroment.token.expireIn,
      });

      const mailer: Mailer = container.get(UtilDependencies.Mailer);
      const isMailSent = await mailer.sendMail(
        enviroment.mailer.appMail,
        user.email.value,
        'Recuperar contraseña - Retamal centro de día',
        `Pulsa en el siguiente enlace para recuperar tu contraseña: <a href="${enviroment.appUrl}/auth/validate-user/${token}" >Recuperar contraseña</a>`
      );

      if (!isMailSent)
        throw new HTTPException('recovery password', 'email not sent', 500);

      res.json({ ok: true });
    } catch (error) {
      errorHandler(res, error, 'recovery password controller');
    }
  }
}
