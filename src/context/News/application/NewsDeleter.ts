import { ImageDeleter } from "../../shared/application/imageDeleter";
import { NewsRepository } from "../domain/interfaces/newsRepository";

export class NewsDeleter {
  constructor(
    private newsRepository: NewsRepository,
    private imageDeleter: ImageDeleter
  ) {}

  async deleteNews(uuid: string): Promise<void> {
    await this.imageDeleter.deleteByEntityUuid(uuid);
    await this.newsRepository.deleteNews(uuid);
  }
}
