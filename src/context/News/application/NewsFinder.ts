import { asyncForEach } from "../../../helpers/asynForeach";
import { Image } from "../../shared/domain/image.model";
import { ImageRepository } from "../../shared/domain/interfaces/image.repository";
import { QueryBuilder } from "../../shared/domain/interfaces/QueryBuilder";
import { UserFinder } from "../../User/application/UserFinder";
import { NewsRepository } from "../domain/interfaces/newsRepository";
import { News } from "../domain/News.model";
import { NewsQueryParams } from "../domain/NewsQueryParams";

export class NewsFinder {
  constructor(
    private newsRepository: NewsRepository,
    private imagesRepository: ImageRepository,
    private queryBuilder: QueryBuilder
  ) {}

  async findAllNews(): Promise<News[]> {
    const news = await this.newsRepository.getNews();

    await asyncForEach<News>(news, async (n) => {
      const images = await this.getImage(n);
      n.setImages(images.map((i) => i.path.value));
    });

    return news;
  }

  async findNewsByUuid(uuid: string): Promise<News> {
    const news = await this.newsRepository.getNewsByUuid(uuid);
    const images = await this.getImage(news);
    news.setImages(images.map((i) => i.path.value));
    return news;
  }

  private async getImage(news: News): Promise<Image[]> {
    return await this.imagesRepository.getByEntityUuid(news.uuid.value);
  }

  public async filter(
    query: NewsQueryParams,
    from: number,
    quantity: number,
    sort_by: string,
    order: "asc" | "desc"
  ): Promise<News[]> {
    const news = await this.newsRepository.filter(
      this.queryBuilder.build(query),
      from,
      quantity,
      sort_by,
      order
    );

    await asyncForEach<News>(news, async (n) => {
      const images = await this.getImage(n);
      n.setImages(images.map((i) => i.path.value));
    });

    return news;
  }

  public async count(query: NewsQueryParams): Promise<number> {
    return await this.newsRepository.count(this.queryBuilder.build(query));
  }
}
