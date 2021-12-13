import { Request, Response } from "express";
import { container } from "../../..";
import { NewsPublisher } from "../../../context/News/application/NewsPublisher";
import { errorHandler } from "../../../helpers/errorHandler";
import { NewsUsesCases } from "../../dic/newsUsesCases.injector";
import { Controller } from "../controller.interface";

export class UnPublishNewsController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    try {
      const newsPublisher: NewsPublisher = container.get(
        NewsUsesCases.NewsPublisher
      );
      const news = await newsPublisher.unpublishNews(uuid);

      res.json({
        ok: true,
        news: news.toObject(),
      });
    } catch (error) {
      errorHandler(res, error, "PublishNewsController");
    }
  }
}
