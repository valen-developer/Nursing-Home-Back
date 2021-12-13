import { ImageRepository } from "../../shared/domain/interfaces/image.repository";
import { NewsRepository } from "../domain/interfaces/newsRepository";

export class NewsDeleter {
  constructor(
    private newsRepository: NewsRepository,
    private imageRepository: ImageRepository
  ) {}

  async deleteNews(uuid: string): Promise<void> {
    await this.imageRepository.deleteAllByEntity(uuid);
    await this.newsRepository.deleteNews(uuid);
  }
}
