import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { container } from "../../..";
import { MenuFinder } from "../../../context/Menu/application/MenuFinder";
import { MenuUpdater } from "../../../context/Menu/application/MenuUpdater";
import { Menu } from "../../../context/Menu/domain/Menu.model";
import { PlateFinder } from "../../../context/Plate/application/PlateFinder";
import { PlateUpdater } from "../../../context/Plate/application/PlateUpdater";
import { Plate } from "../../../context/Plate/domain/plate.model";
import { asyncForEach } from "../../../helpers/asynForeach";
import { errorHandler } from "../../../helpers/errorHandler";
import { MenuUsesCasesInjector } from "../../dic/menuUsesCases.injector";
import { PlateUsesCases } from "../../dic/plateUsesCases.injector";
import { Controller } from "../controller.interface";

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

      const plateFinder: PlateFinder = container.get(
        PlateUsesCases.PlateFinder
      );
      const plateUpdater: PlateUpdater = container.get(
        PlateUsesCases.PlateUpdater
      );
      const plates = await plateFinder.findByMenu(menu.uuid.value);
      const updatedPlates: Plate[] = [];

      await asyncForEach<Plate>(plates, async (plate) => {
        const plateHour = plate.date.value.getHours();
        const newDate = new Date(date).setHours(plateHour);
        const updatedPlate = new Plate({
          uuid: plate.uuid.value,
          name: plate.name.value,
          description: plate.description.value,
          menuUuid: menuUpdated.uuid.value,
          date: new Date(newDate),
          receipe: plate.receipe.value,
          imagePaths: [],
        });

        await plateUpdater.updatePlate(updatedPlate);
        updatedPlates.push(updatedPlate);
      });

      menuUpdated.clearPlates();
      menuUpdated.addPlates(updatedPlates);

      res.json({
        ok: true,
        menu: menuUpdated.toObject(),
      });
    } catch (error) {
      errorHandler(res, error, "update menu controller");
    }
  }
}
