import { IOC } from 'dic-ioc';
import { InstalationCreator } from '../../context/Instalation/application/InstalationCreator';
import { InstalationEliminator } from '../../context/Instalation/application/InstalationEliminator';
import { InstalationFinder } from '../../context/Instalation/application/InstalationFinder';
import { InstalationUpdater } from '../../context/Instalation/application/InstalationUpdater';
import { InstalationRepository } from '../../context/Instalation/domain/interfaces/instalation.respository';
import { ImageDeleter } from '../../context/shared/application/imageDeleter';
import { ImageRepository } from '../../context/shared/domain/interfaces/image.repository';
import { Repositories } from './repositories.injector';
import { UtilDependencies } from './utils.inhector';

export const enum InstalationUsesCases {
  InstalationCreator = 'InstalationCreator',
  InstalationFinder = 'InstalationFinder',
  InstalationUpdater = 'InstalationUpdater',
  InstalationEliminator = 'InstalationEliminator',
}

export const injectInstalationUsesCases = (c: IOC): IOC => {
  const instalationRepository: InstalationRepository = c.get(
    Repositories.InstalationRepository
  );

  const imageRepository: ImageRepository = c.get(Repositories.ImageRepository);
  const imageDeleter: ImageDeleter = c.get(UtilDependencies.ImageDeleter);

  c.setService(
    InstalationUsesCases.InstalationCreator,
    (c) =>
      new InstalationCreator(
        instalationRepository,
        imageRepository,
        c.get(UtilDependencies.UuidGenerator)
      )
  );
  c.setService(
    InstalationUsesCases.InstalationFinder,
    () => new InstalationFinder(instalationRepository, imageRepository)
  );
  c.setService(
    InstalationUsesCases.InstalationEliminator,
    () => new InstalationEliminator(instalationRepository, imageDeleter)
  );
  c.setService(
    InstalationUsesCases.InstalationUpdater,
    () => new InstalationUpdater(instalationRepository)
  );

  return c;
};
