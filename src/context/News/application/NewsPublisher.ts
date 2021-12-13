import { News } from "../domain/News.model";
import { NewsFinder } from "./NewsFinder";
import { NewsUpdater } from "./NewsUpdater";

export class NewsPublisher {
  constructor(
    private newsFinder: NewsFinder,
    private newsUpdater: NewsUpdater
  ) {}

  public async publishNews(uuid: string): Promise<News> {
    const news = await this.newsFinder.findNewsByUuid(uuid);
    news.publish();

    await this.updateNews(news);
    return news;
  }

  public async unpublishNews(uuid: string): Promise<News> {
    const news = await this.newsFinder.findNewsByUuid(uuid);
    news.unpublish();

    await this.updateNews(news);

    return news;
  }

  private async updateNews(news: News): Promise<void> {
    const unPublishedNews = new News(news.toObject());
    unPublishedNews.setImages([]);

    await this.newsUpdater.update(unPublishedNews);
  }
}
