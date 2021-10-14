import { IOC } from 'dic-ioc';
import { InstalationCreator } from '../../context/Instalation/application/InstalationCreator';
import { InstalationEliminator } from '../../context/Instalation/application/InstalationEliminator';
import { InstalationFinder } from '../../context/Instalation/application/InstalationFinder';
import { InstalationUpdater } from '../../context/Instalation/application/InstalationUpdater';
import { InstalationRepository } from '../../context/Instalation/domain/interfaces/instalation.respository';
import { Repositories } from './repositories.injector';

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

  c.setService(
    InstalationUsesCases.InstalationCreator,
    () => new InstalationCreator(instalationRepository)
  );
  c.setService(
    InstalationUsesCases.InstalationFinder,
    () => new InstalationFinder(instalationRepository)
  );
  c.setService(
    InstalationUsesCases.InstalationEliminator,
    () => new InstalationEliminator(instalationRepository)
  );
  c.setService(
    InstalationUsesCases.InstalationUpdater,
    () => new InstalationUpdater(instalationRepository)
  );

  return c;
};
