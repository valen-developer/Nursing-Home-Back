import { Request, Response } from "express";
import { container } from "../../..";
import { NewsFinder } from "../../../context/News/application/NewsFinder";
import { errorHandler } from "../../../helpers/errorHandler";
import { NewsUsesCases } from "../../dic/newsUsesCases.injector";
import { Controller } from "../controller.interface";

export class GetNewController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    try {
      const newsFinder: NewsFinder = container.get(NewsUsesCases.NewsFinder);
      const news = await newsFinder.findNewsByUuid(uuid);

      res.status(200).json({
        ok: true,
        news: news.toObject(),
      });
    } catch (error) {
      errorHandler(res, error, "get new controller");
    }
  }
}
