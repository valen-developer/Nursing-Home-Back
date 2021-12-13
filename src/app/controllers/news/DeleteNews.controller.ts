import { Request, Response } from "express";
import { container } from "../../..";
import { NewsDeleter } from "../../../context/News/application/NewsDeleter";
import { errorHandler } from "../../../helpers/errorHandler";
import { NewsUsesCases } from "../../dic/newsUsesCases.injector";
import { Controller } from "../controller.interface";

export class DeleteNewsController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    try {
      const newsDeleter: NewsDeleter = container.get(NewsUsesCases.NewsDeleter);
      await newsDeleter.deleteNews(uuid);
      res.json({ ok: true });
    } catch (error) {
      errorHandler(res, error, "delete news controller");
    }
  }
}
