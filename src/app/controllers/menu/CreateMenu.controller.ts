import { Request, Response } from 'express';

import { Menu } from '../../../context/Menu/domain/Menu.model';

import { container } from '../../..';
import { MenuCreator } from '../../../context/Menu/application/MenuCreator';
import { errorHandler } from '../../../helpers/errorHandler';
import { MenuUsesCasesInjector } from '../../dic/menuUsesCases.injector';
import { Controller } from '../controller.interface';

export class CreateMenuController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { menuUuid: uuid, title, date } = req.body;

    try {
      const menuCreator: MenuCreator = container.get(
        MenuUsesCasesInjector.MenuCreator
      );
      const menu = new Menu({
        uuid,
        title,
        date,
      });

      await menuCreator.create(menu);

      res.json({
        ok: true,
        menu: menu.toObject(),
      });
    } catch (error) {
      errorHandler(res, error, 'create menu controller');
    }
  }
}
