import { Request, response, Response } from "express";
import { container } from "../../..";
import { RandomImageFinder } from "../../../context/shared/application/RandomImageFinder";
import { errorHandler } from "../../../helpers/errorHandler";
import { UtilDependencies } from "../../dic/utils.inhector";
import { Controller } from "../controller.interface";

export class GetRandomImageController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    try {
      const randomImageFinder: RandomImageFinder = container.get(
        UtilDependencies.RandomImageFinder
      );
      const image = await randomImageFinder.findRandomImage();

      res.json({
        ok: true,
        image: image.toObject(),
      });
    } catch (error) {
      errorHandler(res, error, "get random image controller");
    }
  }
}
