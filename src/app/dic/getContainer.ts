import { IOC } from 'dic-ioc';
import { injectUtils } from './utils.inhector';

export const getContainer = (): IOC => {
  let container = new IOC();

  // utils
  container = injectUtils(container);

  return container;
};
