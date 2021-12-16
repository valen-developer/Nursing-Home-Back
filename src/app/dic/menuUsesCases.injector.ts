import { IOC } from "dic-ioc";
import { Repositories } from "./repositories.injector";

import { MenuRepository } from "../../context/Menu/domain/interfaces/menuRepository.interface";
import { MenuFinder } from "../../context/Menu/application/MenuFinder";
import { PlateUsesCases } from "./plateUsesCases.injector";
import { MenuCreator } from "../../context/Menu/application/MenuCreator";
import { MenuUpdater } from "../../context/Menu/application/MenuUpdater";
import { MenuDeleter } from "../../context/Menu/application/MenuDeleter";
import { MenuDuplicator } from "../../context/Menu/application/MenuDuplicator";
import { UtilDependencies } from "./utils.inhector";

export const enum MenuUsesCasesInjector {
  MenuFinder = "MenuFinder",
  MenuCreator = "MenuCreator",
  MenuUpdater = "MenuUpdater",
  MenuDeleter = "MenuDeleter",
  MenuDuplicator = "MenuDuplicator",
}

export const injectMenuUsesCases = (container: IOC): IOC => {
  const menuRepository: MenuRepository = container.get(
    Repositories.MenuRepository
  );

  container.setService(
    MenuUsesCasesInjector.MenuFinder,
    (c) => new MenuFinder(menuRepository, c.get(PlateUsesCases.PlateFinder))
  );

  container.setService(
    MenuUsesCasesInjector.MenuCreator,
    (c) => new MenuCreator(menuRepository)
  );

  container.setService(
    MenuUsesCasesInjector.MenuUpdater,
    (c) => new MenuUpdater(menuRepository)
  );

  container.setService(
    MenuUsesCasesInjector.MenuDeleter,
    (c) => new MenuDeleter(menuRepository, c.get(PlateUsesCases.PlateDeleter))
  );

  container.setService(
    MenuUsesCasesInjector.MenuDuplicator,
    (c) =>
      new MenuDuplicator(
        c.get(MenuUsesCasesInjector.MenuFinder),
        c.get(MenuUsesCasesInjector.MenuCreator),
        c.get(PlateUsesCases.PlateCreator),
        c.get(UtilDependencies.UuidGenerator),
        c.get(UtilDependencies.ImageDuplicator),
        c.get(Repositories.ImageRepository)
      )
  );

  return container;
};
