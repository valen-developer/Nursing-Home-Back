import { Request, Response } from "express";
import formidable from "formidable";
import { container } from "../../..";
import { JobFinder } from "../../../context/Jobs/application/JobFinder";
import { JobUpdater } from "../../../context/Jobs/application/JobUpdater";
import { Job } from "../../../context/Jobs/domain/job.model";
import { FileDeleter } from "../../../context/shared/application/fileDeleter";
import { Image } from "../../../context/shared/domain/image.model";
import { FileUploader } from "../../../context/shared/domain/interfaces/fileUploader.interface";
import { UuidGenerator } from "../../../context/shared/infrastructure/uuidGenerator";
import { errorHandler } from "../../../helpers/errorHandler";
import { enviroment } from "../../config/enviroment";
import { JobUsesCases } from "../../dic/jobUsesCases.injector";
import { UtilDependencies } from "../../dic/utils.inhector";
import { Controller } from "../controller.interface";

export class UpdateJobController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    const destinationFolder = enviroment.publicFolder;

    const form = formidable({
      multiples: true,
      uploadDir: destinationFolder,
    });

    try {
      form.parse(req, async (err, fields, files) => {
        if (err) throw new Error("server error");

        try {
          // dependencies
          const jobFinder: JobFinder = container.get(JobUsesCases.JobFinder);
          const jobUpdater: JobUpdater = container.get(JobUsesCases.JobUpdate);
          const fileUploader: FileUploader = container.get(
            UtilDependencies.FileUploader
          );
          const fileDeleter: FileDeleter = container.get(
            UtilDependencies.FileDeleter
          );

          const { name, description } = fields;

          const fileArray =
            files.file instanceof Array ? files.file : [files.file];

          const job = await jobFinder.get(uuid);
          const updatedJob = new Job({
            uuid: job.uuid.value,
            name: name as string,
            description: description as string,
            imagePaths: job.imagePaths,
          });

          const imagesPath = await fileUploader.uploadAll(
            fileArray,
            updatedJob.uuid.value,
            destinationFolder
          );
          const uuidGenerator: UuidGenerator = container.get(
            UtilDependencies.UuidGenerator
          );
          updatedJob.setImages(
            imagesPath.map(
              (i) =>
                new Image({
                  path: i,
                  entityUuid: job.uuid.value,
                  uuid: uuidGenerator.generate(),
                })
            )
          );

          await jobUpdater.update(updatedJob).catch((err) => {
            imagesPath.forEach((path) =>
              fileDeleter.byNameMatch(destinationFolder, path)
            );
            throw err;
          });

          res.json({
            ok: true,
            job: updatedJob.toObject(),
          });
        } catch (error) {
          errorHandler(res, error, "update job controller");
        }
      });
    } catch (error) {
      errorHandler(res, error, "update job controller");
    }
  }
}
