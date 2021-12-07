import { Request, Response } from 'express';
import { container } from '../../..';
import { MenuDeleter } from '../../../context/Menu/application/MenuDeleter';
import { errorHandler } from '../../../helpers/errorHandler';
import { MenuUsesCasesInjector } from '../../dic/menuUsesCases.injector';
import { Controller } from '../controller.interface';

export class DeleteMenuController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    try {
      const menuDeleter: MenuDeleter = container.get(
        MenuUsesCasesInjector.MenuDeleter
      );
      await menuDeleter.delete(uuid);

      res.json({
        ok: true,
      });
    } catch (error) {
      errorHandler(res, error, 'delete menu controller');
    }
  }
}
