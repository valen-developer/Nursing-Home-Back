import { asyncForEach } from "../../../helpers/asynForeach";
import { Image } from "../../shared/domain/image.model";
import { ImageRepository } from "../../shared/domain/interfaces/image.repository";
import { UuidGenerator } from "../../shared/infrastructure/uuidGenerator";
import { NewsRepository } from "../domain/interfaces/newsRepository";
import { News } from "../domain/News.model";

export class NewsUpdater {
  constructor(
    private newsRepository: NewsRepository,
    private imageRepository: ImageRepository,
    private uuidGenerator: UuidGenerator
  ) {}

  public async update(news: News): Promise<void> {
    await this.newsRepository.updateNews(news);

    const images = news.imagesPath.map(
      (i) =>
        new Image({
          uuid: this.uuidGenerator.generate(),
          entityUuid: news.uuid.value,
          path: i,
        })
    );

    await asyncForEach<Image>(images, async (image) => {
      await this.imageRepository.create(image);
    });
  }
}
