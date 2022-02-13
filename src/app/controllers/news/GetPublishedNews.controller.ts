import { Request, Response } from "express";
import { container } from "../../..";
import { NewsPublishedFinder } from "../../../context/News/application/NewsPublishedFinder";
import { NewsQueryParams } from "../../../context/News/domain/NewsQueryParams";
import { errorHandler } from "../../../helpers/errorHandler";
import { NewsUsesCases } from "../../dic/newsUsesCases.injector";
import { Controller } from "../controller.interface";

export class GetPublishedNewsController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const queryRequest = req.query;
    const sort_by = (req.query.sort_by as string) || "createdAt";
    const order = (req.query.order as "asc" | "desc") || "desc";
    const page = parseInt((req.query.page as any) ?? 1);

    const query: NewsQueryParams = {
      ...queryRequest,
    };
    try {
      const newsPublishedFinder: NewsPublishedFinder = container.get(
        NewsUsesCases.NewsPublishedFinder
      );
      const news = await newsPublishedFinder.findAll(
        page,
        sort_by,
        order,
        query
      );

      res.json({
        ok: true,
        news: news.map((news) => news.toObject()),
      });
    } catch (error) {
      errorHandler(res, error, "GetPublishedNewsController");
    }
  }
}
