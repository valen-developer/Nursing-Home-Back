import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { container } from '../../..';
import { MenuFinder } from '../../../context/Menu/application/MenuFinder';
import { MenuUpdater } from '../../../context/Menu/application/MenuUpdater';
import { Menu } from '../../../context/Menu/domain/Menu.model';
import { errorHandler } from '../../../helpers/errorHandler';
import { MenuUsesCasesInjector } from '../../dic/menuUsesCases.injector';
import { Controller } from '../controller.interface';

export class UpdateMenuController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { title, date } = req.body;
    const { uuid } = req.params;

    try {
      const menuFinder: MenuFinder = container.get(
        MenuUsesCasesInjector.MenuFinder
      );
      const menuUpdater: MenuUpdater = container.get(
        MenuUsesCasesInjector.MenuUpdater
      );

      const menu = await menuFinder.findByUuid(uuid);

      const menuUpdated = new Menu({
        uuid: menu.uuid.value,
        title,
        date: new Date(date),
      });

      await menuUpdater.update(menuUpdated);
      menuUpdated.addPlates(menu.plates);

      res.json({
        ok: true,
        menu: menuUpdated.toObject(),
      });
    } catch (error) {
      errorHandler(res, error, 'update menu controller');
    }
  }
}
