import { IOC } from "dic-ioc";
import { NewsCreator } from "../../context/News/application/NewsCreator";
import { NewsDeleter } from "../../context/News/application/NewsDeleter";
import { NewsFinder } from "../../context/News/application/NewsFinder";
import { NewsUpdater } from "../../context/News/application/NewsUpdater";
import { Repositories } from "./repositories.injector";
import { UtilDependencies } from "./utils.inhector";

export enum NewsUsesCases {
  NewsCreator = "NewsCreator",
  NewsFinder = "NewsFinder",
  NewsUpdater = "NewsUpdater",
  NewsDeleter = "NewsDeleter",
}

export const injectNewsUsesCases = (container: IOC): IOC => {
  const uuidGenerator = container.get(UtilDependencies.UuidGenerator);
  const imageRepository = container.get(Repositories.ImageRepository);
  const newsRepository = container.get(Repositories.NewsRepository);

  container.setService(
    NewsUsesCases.NewsCreator,
    () => new NewsCreator(newsRepository, imageRepository, uuidGenerator)
  );

  container.setService(
    NewsUsesCases.NewsFinder,
    () => new NewsFinder(newsRepository, imageRepository)
  );

  container.setService(
    NewsUsesCases.NewsUpdater,
    () => new NewsUpdater(newsRepository, imageRepository, uuidGenerator)
  );

  container.setService(
    NewsUsesCases.NewsDeleter,
    () => new NewsDeleter(newsRepository, imageRepository)
  );

  return container;
};
