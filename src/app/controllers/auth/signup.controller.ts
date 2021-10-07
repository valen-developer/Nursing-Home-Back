import { Request, Response } from 'express';
import { container } from '../../..';
import { Mailer } from '../../../context/shared/domain/interfaces/mailer.interface';
import { JWT } from '../../../context/shared/infrastructure/jsonwebtoken.jwt';
import { UserCreator } from '../../../context/User/application/UserCreator';
import { UserEliminator } from '../../../context/User/application/UserEliminator';
import { User } from '../../../context/User/domain/user.model';
import { UserPassword } from '../../../context/User/domain/valueObject/UserPassword.valueObject';
import { errorHandler } from '../../../helpers/errorHandler';
import { enviroment } from '../../config/enviroment';
import { UserUsesCases } from '../../dic/userUsesCases.injector';
import { UtilDependencies } from '../../dic/utils.inhector';

import { Controller } from '../controller.interface';

export class SignupController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { email, name, uuid } = req.body;

    try {
      const user = new User(uuid, name, email, null, 'USER_ROLE');
      const userCreator: UserCreator = container.get(UserUsesCases.UserCreator);

      await userCreator.create(user);

      const mailer: Mailer = container.get(UtilDependencies.Mailer);
      const jwt: JWT = container.get(UtilDependencies.JWT);

      const token = jwt.sign({ uuid }, enviroment.token.seed, {
        expiresIn: enviroment.token.expireIn,
      });

      const isMailSent = await mailer.sendMail(
        enviroment.mailer.appMail,
        email,
        'Registro en Retamal Centro de día',
        'hola, registrese'
      );

      if (isMailSent) {
        res.status(201).json({ ok: true, token });
        return;
      }

      const userDeleter: UserEliminator = container.get(
        UserUsesCases.UserEliminator
      );
      await userDeleter.delete(user.uuid.value);

      res.status(500).json({
        ok: false,
        error: 'user don´t created',
      });
    } catch (error) {
      errorHandler(res, error, 'Signup controller');
    }
  }
}
