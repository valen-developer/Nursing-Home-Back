import { IOC } from "dic-ioc";
import { NewsCreator } from "../../context/News/application/NewsCreator";
import { NewsDeleter } from "../../context/News/application/NewsDeleter";
import { NewsFinder } from "../../context/News/application/NewsFinder";
import { NewsPublishedFinder } from "../../context/News/application/NewsPublishedFinder";
import { NewsPublisher } from "../../context/News/application/NewsPublisher";
import { NewsUpdater } from "../../context/News/application/NewsUpdater";
import { NewsRepository } from "../../context/News/domain/interfaces/newsRepository";
import { ImageRepository } from "../../context/shared/domain/interfaces/image.repository";
import { UuidGenerator } from "../../context/shared/infrastructure/uuidGenerator";
import { Repositories } from "./repositories.injector";
import { UtilDependencies } from "./utils.inhector";

export enum NewsUsesCases {
  NewsCreator = "NewsCreator",
  NewsFinder = "NewsFinder",
  NewsPublishedFinder = "NewsPublishedFinder",
  NewsUpdater = "NewsUpdater",
  NewsDeleter = "NewsDeleter",
  NewsPublisher = "NewsPublisher",
}

export const injectNewsUsesCases = (container: IOC): IOC => {
  const uuidGenerator: UuidGenerator = container.get(
    UtilDependencies.UuidGenerator
  );
  const imageRepository: ImageRepository = container.get(
    Repositories.ImageRepository
  );
  const newsRepository: NewsRepository = container.get(
    Repositories.NewsRepository
  );

  container.setService(
    NewsUsesCases.NewsCreator,
    () => new NewsCreator(newsRepository, imageRepository, uuidGenerator)
  );

  container.setService(
    NewsUsesCases.NewsFinder,
    (c) =>
      new NewsFinder(
        newsRepository,
        imageRepository,
        c.get(UtilDependencies.QueryBuilder)
      )
  );

  container.setService(
    NewsUsesCases.NewsUpdater,
    () => new NewsUpdater(newsRepository, imageRepository, uuidGenerator)
  );

  container.setService(
    NewsUsesCases.NewsDeleter,
    (c) => new NewsDeleter(newsRepository, c.get(UtilDependencies.ImageDeleter))
  );

  container.setService(
    NewsUsesCases.NewsPublisher,
    (c) =>
      new NewsPublisher(
        c.get(NewsUsesCases.NewsFinder),
        c.get(NewsUsesCases.NewsUpdater)
      )
  );

  container.setService(
    NewsUsesCases.NewsPublishedFinder,
    (c) => new NewsPublishedFinder(c.get(NewsUsesCases.NewsFinder))
  );

  return container;
};
