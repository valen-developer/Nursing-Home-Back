import { Request, Response } from 'express';
import { container } from '../../..';
import { MenuFinder } from '../../../context/Menu/application/MenuFinder';
import { errorHandler } from '../../../helpers/errorHandler';
import { MenuUsesCasesInjector } from '../../dic/menuUsesCases.injector';
import { Controller } from '../controller.interface';

export class GetMenusByDateController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { date } = req.params;

    try {
      const menuFinder: MenuFinder = container.get(
        MenuUsesCasesInjector.MenuFinder
      );
      const menus = await menuFinder.findByDate(new Date(date));

      res.json({
        ok: true,
        menus: menus.map((menu) => menu.toObject()),
      });
    } catch (error) {
      errorHandler(res, error, 'get menus controller');
    }
  }
}
