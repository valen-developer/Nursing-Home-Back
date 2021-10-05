import { IOC } from 'dic-ioc';
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

  return container;
};
