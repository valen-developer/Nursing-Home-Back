import { Request, Response } from "express";
import { container } from "../../..";
import { NewsFinder } from "../../../context/News/application/NewsFinder";
import { News } from "../../../context/News/domain/News.model";
import { errorHandler } from "../../../helpers/errorHandler";
import { NewsUsesCases } from "../../dic/newsUsesCases.injector";
import { Controller } from "../controller.interface";

export class GetAllNewsController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    try {
      const newsFinder: NewsFinder = container.get(NewsUsesCases.NewsFinder);
      const news = await newsFinder.findAllNews();

      res.status(200).json({
        ok: true,
        news: news.map((n) => n.toObject()),
      });
    } catch (error) {
      errorHandler(res, error, "get all news controller");
    }
  }
}
