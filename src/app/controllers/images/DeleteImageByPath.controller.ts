import { Request, Response } from "express";
import { container } from "../../..";
import { ImageDeleter } from "../../../context/shared/application/imageDeleter";
import { Controller } from "../controller.interface";

import { UtilDependencies } from "../../dic/utils.inhector";

export class DeleteImageByPathController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { path } = req.query;

    try {
      const imageDeleter: ImageDeleter = container.get(
        UtilDependencies.ImageDeleter
      );

      await imageDeleter.deleteByPath(path as string);

      res.status(200).json({
        ok: true,
      });
    } catch (error) {}
  }
}
