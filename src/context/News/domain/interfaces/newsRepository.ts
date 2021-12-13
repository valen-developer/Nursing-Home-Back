import { News } from "../News.model";

export abstract class NewsRepository {
  abstract getNews(): Promise<News[]>;
  abstract getNewsByUuid(uuid: string): Promise<News>;
  abstract createNews(news: News): Promise<void>;
  abstract updateNews(news: News): Promise<void>;
  abstract deleteNews(uuid: string): Promise<void>;
}
