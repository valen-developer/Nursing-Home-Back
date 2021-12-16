import { Request, Response } from "express";
import { container } from "../../..";
import { MenuDuplicator } from "../../../context/Menu/application/MenuDuplicator";
import { errorHandler } from "../../../helpers/errorHandler";
import { MenuUsesCasesInjector } from "../../dic/menuUsesCases.injector";
import { Controller } from "../controller.interface";

export class DuplicateMenuByDateController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { menuUuid: uuid, date } = req.body;

    try {
      const menuDuplicator: MenuDuplicator = container.get(
        MenuUsesCasesInjector.MenuDuplicator
      );
      const menu = await menuDuplicator.duplicateByDate(uuid, new Date(date));

      res.json({
        ok: true,
        menu: menu.toObject(),
      });
    } catch (error) {
      errorHandler(res, error, "DuplicateMenuByDateController");
    }
  }
}
