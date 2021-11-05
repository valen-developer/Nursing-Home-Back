import { IOC } from 'dic-ioc';
import { injectActivityUsesCases } from './activityUsesCases.injector';
import { injectInstalationUsesCases } from './instalationUsesCases.injector';
import { injectJobUsesCases } from './jobUsesCases.injector';
import { injectRepositories } from './repositories.injector';
import { injectUserUsesCases } from './userUsesCases.injector';

import { injectUtils } from './utils.inhector';

export const getContainer = (): IOC => {
  let container = new IOC();

  // utils
  container = injectUtils(container);

  // Repositoies
  container = injectRepositories(container);

  // User use cases
  container = injectUserUsesCases(container);

  // Instalation use cases
  container = injectInstalationUsesCases(container);

  // Job use cases
  container = injectJobUsesCases(container);

  // Activity use cases
  container = injectActivityUsesCases(container);

  return container;
};
