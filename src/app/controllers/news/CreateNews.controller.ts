import { Request, Response } from "express";
import formidable from "formidable";

import { container } from "../../..";
import { NewsCreator } from "../../../context/News/application/NewsCreator";
import { News, NewsObject } from "../../../context/News/domain/News.model";
import { FileDeleter } from "../../../context/shared/application/fileDeleter";
import { HTTPException } from "../../../context/shared/domain/httpException";
import { FileUploader } from "../../../context/shared/domain/interfaces/fileUploader.interface";
import { UserFinder } from "../../../context/User/application/UserFinder";
import { errorHandler } from "../../../helpers/errorHandler";
import { enviroment } from "../../config/enviroment";
import { NewsUsesCases } from "../../dic/newsUsesCases.injector";
import { UserUsesCases } from "../../dic/userUsesCases.injector";
import { UtilDependencies } from "../../dic/utils.inhector";
import { Controller } from "../controller.interface";

export class CreateNewsController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid: creatorUud } = req.body;

    const uploadDir = enviroment.publicFolder;

    const form = formidable({
      uploadDir,
      multiples: true,
    });

    try {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          throw err;
        }

        try {
          const newsObject = fields as unknown as NewsObject;
          const isCreator = newsObject.own === creatorUud;
          if (!isCreator)
            throw new HTTPException(
              "create new controller",
              "Unautorized",
              401
            );

          const userFinder: UserFinder = container.get(
            UserUsesCases.UserFinder
          );
          const owner = await userFinder.getUser(creatorUud);

          const fileArray =
            files.file instanceof Array ? files.file : [files.file];

          const news = new News({
            ...newsObject,
            own: owner.uuid.value,
            ownName: owner.name.value,
            publishingState: "DRAFT",
          });

          // save images
          const fileUploader: FileUploader = container.get(
            UtilDependencies.FileUploader
          );
          const imagePaths: string[] = await fileUploader.uploadAll(
            fileArray,
            news.uuid.value,
            uploadDir
          );

          news.setImages(imagePaths);

          const fileDeleter: FileDeleter = container.get(
            UtilDependencies.FileDeleter
          );

          const newsCreator: NewsCreator = container.get(
            NewsUsesCases.NewsCreator
          );
          await newsCreator.create(news).catch((err) => {
            imagePaths.forEach((path) =>
              fileDeleter.byNameMatch(uploadDir, path)
            );

            throw err;
          });

          res.json({ ok: true, news: news.toObject() });
        } catch (error) {
          errorHandler(res, error, "create news controller");
        }
      });
    } catch (error) {
      errorHandler(res, error, "create news controller");
    }
  }
}
