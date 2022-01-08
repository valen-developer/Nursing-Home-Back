import { Request, Response } from "express";
import { container } from "../../..";
import { NewsPublisher } from "../../../context/News/application/NewsPublisher";
import { UserFinder } from "../../../context/User/application/UserFinder";
import { errorHandler } from "../../../helpers/errorHandler";
import { NewsUsesCases } from "../../dic/newsUsesCases.injector";
import { UserUsesCases } from "../../dic/userUsesCases.injector";
import { Controller } from "../controller.interface";

export class UnPublishNewsController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;
    const { uuid: updaterUuid } = req.body;

    try {
      const newsPublisher: NewsPublisher = container.get(
        NewsUsesCases.NewsPublisher
      );
      const userFinder: UserFinder = container.get(UserUsesCases.UserFinder);
      const updater = await userFinder.getUser(updaterUuid);
      const news = await newsPublisher.unpublishNews(uuid, updater);

      res.json({
        ok: true,
        news: news.toObject(),
      });
    } catch (error) {
      errorHandler(res, error, "PublishNewsController");
    }
  }
}
