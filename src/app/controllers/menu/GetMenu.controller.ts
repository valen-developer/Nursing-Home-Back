import { Request, Response } from 'express';
import { container } from '../../..';
import { MenuFinder } from '../../../context/Menu/application/MenuFinder';
import { errorHandler } from '../../../helpers/errorHandler';
import { MenuUsesCasesInjector } from '../../dic/menuUsesCases.injector';
import { Controller } from '../controller.interface';

export class GetMenuController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    try {
      const menuFinder: MenuFinder = container.get(
        MenuUsesCasesInjector.MenuFinder
      );
      const menu = await menuFinder.findByUuid(uuid);

      res.json({
        ok: true,
        menu: menu.toObject(),
      });
    } catch (error) {
      errorHandler(res, error, 'get menu controller');
    }
  }
}
