import { Request, Response } from "express";
import { container } from "../../..";
import { NewsPublishedFinder } from "../../../context/News/application/NewsPublishedFinder";
import { errorHandler } from "../../../helpers/errorHandler";
import { NewsUsesCases } from "../../dic/newsUsesCases.injector";
import { Controller } from "../controller.interface";

export class GetPublishedNewsController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { page } = req.query;

    try {
      const newsPublishedFinder: NewsPublishedFinder = container.get(
        NewsUsesCases.NewsPublishedFinder
      );
      const news = await newsPublishedFinder.findAll(Number(page ?? 0));

      res.json({
        ok: true,
        news: news.map((news) => news.toObject()),
      });
    } catch (error) {
      errorHandler(res, error, "GetPublishedNewsController");
    }
  }
}
