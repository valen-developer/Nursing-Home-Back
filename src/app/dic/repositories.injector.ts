import { IOC } from 'dic-ioc';

import { MongoUserRepository } from '../../context/User/infrastructure/MongoUserRepository/MongoUserRepository';
import { RedisUserCacheRepository } from '../../context/User/infrastructure/RedisUserCacheRepository';

export const enum Repositories {
  UserRepository = 'UserRepository',
  UserCacheRepository = 'UserCacheRepository',
}

export const injectRepositories = (container: IOC): IOC => {
  container.setService(
    Repositories.UserRepository,
    () => new MongoUserRepository()
  );

  container.setService(
    Repositories.UserCacheRepository,
    () => new RedisUserCacheRepository()
  );

  return container;
};
