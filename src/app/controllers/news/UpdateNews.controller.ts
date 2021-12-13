import { Request, Response } from "express";
import formidable from "formidable";
import { container } from "../../..";
import { NewsFinder } from "../../../context/News/application/NewsFinder";
import { NewsUpdater } from "../../../context/News/application/NewsUpdater";
import { News } from "../../../context/News/domain/News.model";
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

export class UpdateNewsController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.body;
    const { uuid: newsUuid } = req.params;
    const uploadDir = enviroment.publicFolder;

    const form = formidable({
      uploadDir,
      multiples: true,
    });

    try {
      form.parse(req, async (err, fields, files) => {
        if (err) throw err;
        try {
          const { title, subtitle, content } = fields;
          const fileArray =
            files.file instanceof Array ? files.file : [files.file];

          const newFinder: NewsFinder = container.get(NewsUsesCases.NewsFinder);
          const news = await newFinder.findNewsByUuid(newsUuid as string);

          const userFinder: UserFinder = container.get(
            UserUsesCases.UserFinder
          );
          const user = await userFinder.getUser(uuid);

          const updatedNews = new News({
            ...news.toObject(),
            title: title as string,
            subtitle: subtitle as string,
            content: content as string,
            updater: user.uuid.value,
            updaterName: user.name.value,
            updatedAt: new Date(),
          });

          // save images
          const fileUploader: FileUploader = container.get(
            UtilDependencies.FileUploader
          );
          const imagePaths: string[] = await fileUploader
            .uploadAll(fileArray, updatedNews.uuid.value, uploadDir)
            .catch((err) => {
              return [];
            });

          updatedNews.setImages(imagePaths);

          const fileDeleter: FileDeleter = container.get(
            UtilDependencies.FileDeleter
          );
          const newsUpdater: NewsUpdater = container.get(
            NewsUsesCases.NewsUpdater
          );
          await newsUpdater.update(updatedNews).catch((err) => {
            console.log(
              "🚀 ~ file: UpdateNews.controller.ts ~ line 64 ~ UpdateNewsController ~ form.parse ~ err",
              err
            );
            imagePaths.forEach((path) =>
              fileDeleter.byNameMatch(uploadDir, path)
            );

            throw err;
          });

          res.json({ ok: true, news: updatedNews.toObject() });
        } catch (error) {
          errorHandler(res, error, "update news controller");
        }
      });
    } catch (error) {
      errorHandler(res, error, "update news controller");
    }
  }
}
