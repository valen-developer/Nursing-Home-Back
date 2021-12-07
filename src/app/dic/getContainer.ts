import { IOC } from 'dic-ioc';
import { injectActivityUsesCases } from './activityUsesCases.injector';
import { injectInstalationUsesCases } from './instalationUsesCases.injector';
import { injectJobUsesCases } from './jobUsesCases.injector';
import { injectMenuUsesCases } from './menuUsesCases.injector';
import { injectPlateUsesCases } from './plateUsesCases.injector';
import { injectRepositories } from './repositories.injector';
import { injectUserUsesCases } from './userUsesCases.injector';

import { injectUtils } from './utils.inhector';

export const getContainer = (): IOC => {
  let container = new IOC();

  // Repositoies
  container = injectRepositories(container);

  // utils
  container = injectUtils(container);

  // User use cases
  container = injectUserUsesCases(container);

  // Instalation use cases
  container = injectInstalationUsesCases(container);

  // Job use cases
  container = injectJobUsesCases(container);

  // Activity use cases
  container = injectActivityUsesCases(container);

  // Plate use cases
  container = injectPlateUsesCases(container);

  // Menu use cases
  container = injectMenuUsesCases(container);

  return container;
};
