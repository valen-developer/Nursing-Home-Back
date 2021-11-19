import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import formidable from 'formidable';
import { ParsedQs } from 'qs';
import { container } from '../../..';
import { JobFinder } from '../../../context/Jobs/application/JobFinder';
import { JobUpdater } from '../../../context/Jobs/application/JobUpdater';
import { Job } from '../../../context/Jobs/domain/job.model';
import { FileDeleter } from '../../../context/shared/application/fileDeleter';
import { FileUploader } from '../../../context/shared/domain/interfaces/fileUploader.interface';
import { errorHandler } from '../../../helpers/errorHandler';
import { enviroment } from '../../config/enviroment';
import { JobUsesCases } from '../../dic/jobUsesCases.injector';
import { UtilDependencies } from '../../dic/utils.inhector';
import { Controller } from '../controller.interface';

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
        if (err) throw new Error('server error');

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
          updatedJob.setImages(imagesPath);

          await jobUpdater.update(updatedJob).catch((err) => {
            imagesPath.forEach((path) =>
              fileDeleter.byNameMatch(destinationFolder, path)
            );
            throw err;
          });

          res.json({
            ok: true,
          });
        } catch (error) {
          errorHandler(res, error, 'update job controller');
        }
      });
    } catch (error) {
      errorHandler(res, error, 'update job controller');
    }
  }
}
