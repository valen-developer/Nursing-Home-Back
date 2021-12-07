import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { container } from '../../..';
import { MenuFinder } from '../../../context/Menu/application/MenuFinder';
import { errorHandler } from '../../../helpers/errorHandler';
import { MenuUsesCasesInjector } from '../../dic/menuUsesCases.injector';
import { Controller } from '../controller.interface';

export class GetAllMenusController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    try {
      const menuFinder: MenuFinder = container.get(
        MenuUsesCasesInjector.MenuFinder
      );
      const menus = await menuFinder.findAll();

      res.json({
        ok: true,
        menus: menus.map((menu) => menu.toObject()),
      });
    } catch (error) {
      errorHandler(res, error, 'get all menus controller');
    }
  }
}
