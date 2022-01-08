import { Request, Response } from "express";
import { container } from "../../..";
import { NewsPublisher } from "../../../context/News/application/NewsPublisher";
import { UserFinder } from "../../../context/User/application/UserFinder";
import { errorHandler } from "../../../helpers/errorHandler";
import { NewsUsesCases } from "../../dic/newsUsesCases.injector";
import { UserUsesCases } from "../../dic/userUsesCases.injector";
import { Controller } from "../controller.interface";

export class PublishNewsController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;
    const { uuid: updaterUuid } = req.body;
    console.log(
      "🚀 ~ file: PublishNews.controller.ts ~ line 14 ~ PublishNewsController ~ run ~ updaterUuid",
      updaterUuid
    );

    try {
      const newsPublisher: NewsPublisher = container.get(
        NewsUsesCases.NewsPublisher
      );
      const userFinder: UserFinder = container.get(UserUsesCases.UserFinder);
      const updater = await userFinder.getUser(updaterUuid);

      const news = await newsPublisher.publishNews(uuid, updater);

      res.json({
        ok: true,
        news: news.toObject(),
      });
    } catch (error) {
      errorHandler(res, error, "PublishNewsController");
    }
  }
}
