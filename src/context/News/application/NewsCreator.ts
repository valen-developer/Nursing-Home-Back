import { asyncForEach } from "../../../helpers/asynForeach";
import { Image } from "../../shared/domain/image.model";
import { ImageRepository } from "../../shared/domain/interfaces/image.repository";
import { UuidGenerator } from "../../shared/infrastructure/uuidGenerator";
import { NewsRepository } from "../domain/interfaces/newsRepository";
import { News } from "../domain/News.model";

export class NewsCreator {
  constructor(
    private newsRepository: NewsRepository,
    private imageRepository: ImageRepository,
    private uuidGenerator: UuidGenerator
  ) {}

  async create(news: News): Promise<News> {
    await this.newsRepository.createNews(news);

    const images = news.imagesPath.map((i) => {
      return new Image({
        path: i,
        uuid: this.uuidGenerator.generate(),
        entityUuid: news.uuid.value,
      });
    });

    await asyncForEach<Image>(images, async (image) => {
      await this.imageRepository.create(image);
    });

    return news;
  }
}
