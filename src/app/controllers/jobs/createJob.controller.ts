import { Request, Response } from "express";
import formidable from "formidable";
import fs from "fs";

import { container } from "../../..";
import { JobCreater } from "../../../context/Jobs/application/JobCreater";
import { JobUpdater } from "../../../context/Jobs/application/JobUpdater";
import { Job } from "../../../context/Jobs/domain/job.model";
import { FileDeleter } from "../../../context/shared/application/fileDeleter";
import { Image } from "../../../context/shared/domain/image.model";
import { FileUploader } from "../../../context/shared/domain/interfaces/fileUploader.interface";
import { UuidGenerator } from "../../../context/shared/infrastructure/uuidGenerator";
import { asyncForEach } from "../../../helpers/asynForeach";
import { errorHandler } from "../../../helpers/errorHandler";
import { enviroment } from "../../config/enviroment";
import { JobUsesCases } from "../../dic/jobUsesCases.injector";
import { UtilDependencies } from "../../dic/utils.inhector";

import { Controller } from "../controller.interface";

export class CreateJobController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const uploadDir = enviroment.publicFolder;

    const form = formidable({
      uploadDir: uploadDir,
      multiples: true,
    });

    try {
      form.parse(req, async (err, fields, files) => {
        try {
          if (err) throw new Error("server error");

          const fileDeleter: FileDeleter = container.get(
            UtilDependencies.FileDeleter
          );

          const { jobUuid: uuid, name, description } = fields;

          const fileArray =
            files.file instanceof Array ? files.file : [files.file];

          const job = new Job({
            uuid: uuid as string,
            name: name as string,
            description: description as string,
            imagePaths: [],
          });

          const fileUploader: FileUploader = container.get(
            UtilDependencies.FileUploader
          );
          const imagePaths: string[] = await fileUploader.uploadAll(
            fileArray,
            job.uuid.value,
            uploadDir
          );
          const uuidGenerator: UuidGenerator = container.get(
            UtilDependencies.UuidGenerator
          );
          job.setImages(
            imagePaths.map(
              (i) =>
                new Image({
                  path: i,
                  entityUuid: job.uuid.value,
                  uuid: uuidGenerator.generate(),
                })
            )
          );

          // Create job
          const jobCreater: JobCreater = container.get(JobUsesCases.JobCreator);
          await jobCreater.create(job).catch((err) => {
            imagePaths.forEach((path) =>
              fileDeleter.byNameMatch(uploadDir, path)
            );

            throw err;
          });

          res.json({
            ok: true,
            job: job.toObject(),
          });
        } catch (error) {
          errorHandler(res, error, "create job controller");
        }
      });
    } catch (error) {
      errorHandler(res, error, "create job controller");
    }
  }
}
