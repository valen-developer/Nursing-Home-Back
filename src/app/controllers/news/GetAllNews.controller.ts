import { Request, Response } from "express";
import { container } from "../../..";
import { NewsFinder } from "../../../context/News/application/NewsFinder";
import { News } from "../../../context/News/domain/News.model";
import { NewsQueryParams } from "../../../context/News/domain/NewsQueryParams";
import { errorHandler } from "../../../helpers/errorHandler";
import { NewsUsesCases } from "../../dic/newsUsesCases.injector";
import { Controller } from "../controller.interface";

export class GetAllNewsController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const queryRequest = req.query;
    const sort_by = (req.query.sort_by as string) || "createdAt";
    const order = (req.query.order as "asc" | "desc") || "desc";
    const from = parseInt((req.query.from as any) ?? 0);
    const quantity = parseInt((req.query.quantity as any) ?? 10);

    const query: NewsQueryParams = {
      ...queryRequest,
    };

    try {
      const newsFinder: NewsFinder = container.get(NewsUsesCases.NewsFinder);
      const news = await newsFinder.filter(
        query,
        from,
        quantity,
        sort_by,
        order
      );

      const count = await newsFinder.count(query);
      const pages = Math.ceil(count / quantity);

      res.status(200).json({
        ok: true,
        news: news.map((n) => n.toObject()),
        count: count,
        pages: pages,
      });
    } catch (error) {
      errorHandler(res, error, "get all news controller");
    }
  }
}
