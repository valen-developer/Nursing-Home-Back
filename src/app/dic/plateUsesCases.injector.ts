import { IOC } from "dic-ioc";
import { PlateCreator } from "../../context/Plate/application/PlateCreator";
import { PlateDeleter } from "../../context/Plate/application/PlateDeleter";
import { PlateFinder } from "../../context/Plate/application/PlateFinder";
import { PlateUpdater } from "../../context/Plate/application/PlateUpdater";
import { PlateRepository } from "../../context/Plate/domain/interfaces/PlateRepository.interface";
import { ImageRepository } from "../../context/shared/domain/interfaces/image.repository";
import { UuidGenerator } from "../../context/shared/infrastructure/uuidGenerator";
import { Repositories } from "./repositories.injector";
import { UtilDependencies } from "./utils.inhector";

export enum PlateUsesCases {
  PlateFinder = "PlateFinder",
  PlateCreator = "PlateCreator",
  PlateUpdater = "PlateUpdater",
  PlateDeleter = "PlateDeleter",
}

export const injectPlateUsesCases = (container: IOC): IOC => {
  const plateRepository: PlateRepository = container.get(
    Repositories.PlateRepository
  );
  const imageRepository: ImageRepository = container.get(
    Repositories.ImageRepository
  );
  const uuidGenerator: UuidGenerator = container.get(
    UtilDependencies.UuidGenerator
  );

  container.setService(
    PlateUsesCases.PlateFinder,
    (c) =>
      new PlateFinder(
        plateRepository,
        imageRepository,
        c.get(UtilDependencies.QueryBuilder)
      )
  );

  container.setService(
    PlateUsesCases.PlateCreator,
    () => new PlateCreator(plateRepository, imageRepository, uuidGenerator)
  );

  container.setService(
    PlateUsesCases.PlateUpdater,
    () => new PlateUpdater(plateRepository, imageRepository, uuidGenerator)
  );

  container.setService(
    PlateUsesCases.PlateDeleter,
    (c) =>
      new PlateDeleter(plateRepository, c.get(UtilDependencies.ImageDeleter))
  );

  return container;
};
