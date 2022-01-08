import { User } from "../../User/domain/user.model";
import { News } from "../domain/News.model";
import { NewsFinder } from "./NewsFinder";
import { NewsUpdater } from "./NewsUpdater";

export class NewsPublisher {
  constructor(
    private newsFinder: NewsFinder,
    private newsUpdater: NewsUpdater
  ) {}

  public async publishNews(uuid: string, updater: User): Promise<News> {
    const news = await this.newsFinder.findNewsByUuid(uuid);
    news.publish();
    news.updatedBy(updater);

    await this.updateNews(news);
    return news;
  }

  public async unpublishNews(uuid: string, updater: User): Promise<News> {
    const news = await this.newsFinder.findNewsByUuid(uuid);
    news.unpublish();
    news.updatedBy(updater);

    await this.updateNews(news);

    return news;
  }

  private async updateNews(news: News): Promise<void> {
    const unPublishedNews = new News({
      ...news.toObject(),
      updatedAt: new Date(),
    });
    unPublishedNews.setImages([]);

    await this.newsUpdater.update(unPublishedNews);
  }
}
