import { IOC } from "dic-ioc";
import { MongoActivityRepository } from "../../context/Activity/infrastructure/mongoActivityRepository/mongoActivityRepository";

import { MongoInstalationRepository } from "../../context/Instalation/infrastructure/mongoInstalationRepository/mongoInstalationRepository";
import { MongoJobRepository } from "../../context/Jobs/infrastructure/mongoJobRepository/mongoJob.respository";
import { MongoMenuRepository } from "../../context/Menu/infrastructure/mongoMenuRepository/MongoMenuRepository";
import { MongoNewsRepository } from "../../context/News/infrastructure/mongoNewsRepository/mongoNewsRepository";
import { MongoPlateRepository } from "../../context/Plate/infrastructure/mongoPlateRepository/mongoPlateRepository";
import { MongoImageRepository } from "../../context/shared/infrastructure/imageRepository/mongoImageRepository";
import { MongoUserRepository } from "../../context/User/infrastructure/MongoUserRepository/MongoUserRepository";
import { RedisUserCacheRepository } from "../../context/User/infrastructure/RedisUserCacheRepository";

export const enum Repositories {
  UserRepository = "UserRepository",
  UserCacheRepository = "UserCacheRepository",
  InstalationRepository = "InstalationRepository",
  JobRepository = "JobRepository",
  ActivityRepository = "ActivityRepository",
  ImageRepository = "ImageRepository",
  PlateRepository = "PlateRepository",
  MenuRepository = "MenuRepository",
  NewsRepository = "NewsRepository",
}

export const injectRepositories = (container: IOC): IOC => {
  container.setService(
    Repositories.ImageRepository,
    () => new MongoImageRepository()
  );

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

  container.setService(
    Repositories.PlateRepository,
    () => new MongoPlateRepository()
  );

  container.setService(
    Repositories.MenuRepository,
    () => new MongoMenuRepository()
  );

  container.setService(
    Repositories.NewsRepository,
    () => new MongoNewsRepository()
  );

  return container;
};
