import { HTTPException } from "../../../shared/domain/httpException";
import { manageMongoError } from "../../../shared/infrastructure/manageMongoError";
import { NewsRepository } from "../../domain/interfaces/newsRepository";
import { News, NewsObject } from "../../domain/News.model";
import { NewsMongoModel } from "./mongoNewsModel";

export class MongoNewsRepository implements NewsRepository {
  async getNews(): Promise<News[]> {
    try {
      const newsObjet: NewsObject[] = await NewsMongoModel.find();
      return newsObjet.map((news: NewsObject) => new News(news));
    } catch (error) {
      return [];
    }
  }

  async filter(
    query: any,
    from = 0,
    quantity = 20,
    sort_by = "createdAt",
    order = "asc"
  ): Promise<News[]> {
    return await NewsMongoModel.find(query)
      .skip(from)
      .limit(quantity)
      .sort({
        [sort_by]: order,
      });
  }

  async getNewsByUuid(uuid: string): Promise<News> {
    try {
      const newsObject: NewsObject = await NewsMongoModel.findOne({
        uuid: uuid,
      });

      return new News(newsObject);
    } catch (error) {
      throw new HTTPException(
        "mongo new repository: get uuid",
        "Not found",
        404
      );
    }
  }

  async createNews(news: News): Promise<void> {
    const newsModel = new NewsMongoModel(news.toObject());

    try {
      await newsModel.save();
    } catch (error) {
      manageMongoError(error, "create news: mongo repository");
    }
  }

  async updateNews(news: News): Promise<void> {
    try {
      return NewsMongoModel.findOneAndUpdate(
        { uuid: news.uuid.value },
        news.toObject()
      );
    } catch (error) {
      manageMongoError(error, "update news: mongo repository");
    }
  }

  async deleteNews(uuid: string): Promise<void> {
    await NewsMongoModel.findOneAndDelete({ uuid: uuid });
  }

  async count(query: any): Promise<number> {
    return await NewsMongoModel.countDocuments(query);
  }
}
