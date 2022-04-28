import { Request, Response } from "express";
import formidable from "formidable";
import fs from "fs";

import { container } from "../../..";
import { InstalationFinder } from "../../../context/Instalation/application/InstalationFinder";
import { InstalationUpdater } from "../../../context/Instalation/application/InstalationUpdater";
import { Instalation } from "../../../context/Instalation/domain/instalation.model";
import { Image } from "../../../context/shared/domain/image.model";
import { FileUploader } from "../../../context/shared/domain/interfaces/fileUploader.interface";
import { UuidGenerator } from "../../../context/shared/infrastructure/uuidGenerator";
import { errorHandler } from "../../../helpers/errorHandler";
import { enviroment } from "../../config/enviroment";
import { InstalationUsesCases } from "../../dic/instalationUsesCases.injector";
import { UtilDependencies } from "../../dic/utils.inhector";

import { Controller } from "../controller.interface";

export class UpdateInstalationController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    const destinationFolder = enviroment.publicFolder;

    const form = formidable({
      uploadDir: destinationFolder,
      multiples: true,
    });

    try {
      form.parse(req, async (err, fields, files) => {
        if (err) throw new Error("server error");
        try {
          // get dependencies
          const instalationFinder: InstalationFinder = container.get(
            InstalationUsesCases.InstalationFinder
          );
          const instalationUpdater: InstalationUpdater = container.get(
            InstalationUsesCases.InstalationUpdater
          );
          const fileUploader: FileUploader = container.get(
            UtilDependencies.FileUploader
          );

          const { name, description } = fields;

          const fileArray =
            files.file instanceof Array ? files.file : [files.file];

          const instalation = await instalationFinder.get(uuid);
          const updatedInstalation = new Instalation({
            uuid: instalation.uuid.value,
            name: name as string,
            description: description as string,
            imagePaths: [],
          });

          const imagesPath = await fileUploader.uploadAll(
            fileArray,
            instalation.uuid.value,
            destinationFolder
          );
          const uuidGenerator: UuidGenerator = container.get(
            UtilDependencies.UuidGenerator
          );
          updatedInstalation.setImages(
            imagesPath.map(
              (i) =>
                new Image({
                  path: i,
                  entityUuid: updatedInstalation.uuid.value,
                  uuid: uuidGenerator.generate(),
                })
            )
          );

          await instalationUpdater.update(updatedInstalation).catch((err) => {
            imagesPath.forEach((path) => fs.unlinkSync(path));

            throw new Error("server error");
          });

          res.json({
            ok: true,
            instalation: updatedInstalation.toObject(),
          });
        } catch (error) {
          errorHandler(res, error, "update activity controller");
        }
      });
    } catch (error) {
      errorHandler(res, error, "update activity controller");
    }
  }
}
