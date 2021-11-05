import { IOC } from 'dic-ioc';
import { MongoActivityRepository } from '../../context/Activity/infrastructure/mongoActivityRepository/mongoActivityRepository';

import { MongoInstalationRepository } from '../../context/Instalation/infrastructure/mongoInstalationRepository/mongoInstalationRepository';
import { MongoJobRepository } from '../../context/Jobs/infrastructure/mongoJobRepository/mongoJob.respository';
import { MongoUserRepository } from '../../context/User/infrastructure/MongoUserRepository/MongoUserRepository';
import { RedisUserCacheRepository } from '../../context/User/infrastructure/RedisUserCacheRepository';

export const enum Repositories {
  UserRepository = 'UserRepository',
  UserCacheRepository = 'UserCacheRepository',
  InstalationRepository = 'InstalationRepository',
  JobRepository = 'JobRepository',
  ActivityRepository = 'ActivityRepository',
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

  container.setService(
    Repositories.InstalationRepository,
    () => new MongoInstalationRepository()
  );

  container.setService(
    Repositories.JobRepository,
    () => new MongoJobRepository()
  );

  container.setService(
    Repositories.ActivityRepository,
    () => new MongoActivityRepository()
  );

  return container;
};
