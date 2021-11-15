import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { container } from '../../..';
import { UserEliminator } from '../../../context/User/application/UserEliminator';
import { errorHandler } from '../../../helpers/errorHandler';
import { UserUsesCases } from '../../dic/userUsesCases.injector';
import { Controller } from '../controller.interface';

export class DeleteUserController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { userUuid: uuid } = req.params;

    try {
      const userEliminator: UserEliminator = container.get(
        UserUsesCases.UserEliminator
      );
      await userEliminator.delete(uuid);

      res.json({ ok: true });
    } catch (error) {
      errorHandler(res, error, 'delete user controller');
    }
  }
}
