import { Request, Response } from 'express';
import { container } from '../../..';
import { JobCreater } from '../../../context/Jobs/application/JobCreater';
import { Job } from '../../../context/Jobs/domain/job.model';
import { errorHandler } from '../../../helpers/errorHandler';
import { JobUsesCases } from '../../dic/jobUsesCases.injector';

import { Controller } from '../controller.interface';

export class CreateJobController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { jobUuid: uuid, name, description } = req.body;

    try {
      const jobCreator: JobCreater = container.get(JobUsesCases.JobCreator);
      const job = new Job({
        uuid,
        name,
        description,
      });

      await jobCreator.create(job);

      res.json({ ok: true });
    } catch (error) {
      errorHandler(res, error, 'create job controller');
    }
  }
}
