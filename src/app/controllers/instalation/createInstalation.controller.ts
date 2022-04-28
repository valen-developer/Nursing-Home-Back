import { Request, Response } from "express";
import formidable from "formidable";
import fs from "fs";

import { FileDeleter } from "../../../context/shared/application/fileDeleter";
import { container } from "../../..";
import { InstalationCreator } from "../../../context/Instalation/application/InstalationCreator";
import { Instalation } from "../../../context/Instalation/domain/instalation.model";
import { FileUploader } from "../../../context/shared/domain/interfaces/fileUploader.interface";
import { errorHandler } from "../../../helpers/errorHandler";
import { InstalationUsesCases } from "../../dic/instalationUsesCases.injector";
import { UtilDependencies } from "../../dic/utils.inhector";
import { Controller } from "../controller.interface";
import { enviroment } from "../../config/enviroment";
import { UuidGenerator } from "../../../context/shared/infrastructure/uuidGenerator";
import { Image } from "../../../context/shared/domain/image.model";

export class CreateInstalationController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const destinationFolder = enviroment.publicFolder;

    const form = formidable({
      multiples: true,
      uploadDir: destinationFolder,
    });

    try {
      form.parse(req, async (err, fields, files) => {
        try {
          if (err) throw new Error("server error");

          const fileDeleter: FileDeleter = container.get(
            UtilDependencies.FileDeleter
          );

          const { instalationUuid, name, description } = fields;

          const fileArray =
            files.file instanceof Array ? files.file : [files.file];

          // Instalation instance
          const instalation = new Instalation({
            uuid: instalationUuid as string,
            description: description as string,
            name: name as string,
            imagePaths: [],
          });

          // save images
          const fileUploader: FileUploader = container.get(
            UtilDependencies.FileUploader
          );

          const imagePaths: string[] = await fileUploader.uploadAll(
            fileArray,
            instalation.uuid.value,
            destinationFolder
          );

          const uuidGenerator: UuidGenerator = container.get(
            UtilDependencies.UuidGenerator
          );
          instalation.setImages(
            imagePaths.map(
              (i) =>
                new Image({
                  path: i,
                  entityUuid: instalation.uuid.value,
                  uuid: uuidGenerator.generate(),
                })
            )
          );

          // Create instalation
          const instalationCreator: InstalationCreator = container.get(
            InstalationUsesCases.InstalationCreator
          );
          await instalationCreator.create(instalation).catch((err) => {
            imagePaths.forEach((path) =>
              fileDeleter.byNameMatch(destinationFolder, path)
            );

            throw err;
          });

          res.json({ ok: true, instalation: instalation.toObject() });
        } catch (error) {
          errorHandler(res, error, "create instalation controller");
        }
      });
    } catch (error) {
      errorHandler(res, error, "create instalation controller");
    }
  }
}
