import { Request, Response } from 'express';
import { container } from '../../..';
import { JobFinder } from '../../../context/Jobs/application/JobFinder';
import { errorHandler } from '../../../helpers/errorHandler';
import { JobUsesCases } from '../../dic/jobUsesCases.injector';

import { Controller } from '../controller.interface';

export class GetAllJobsController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    try {
      const jobFinder: JobFinder = container.get(JobUsesCases.JobFinder);
      const jobs = await jobFinder.getAll();

      res.json({
        ok: true,
        jobs: jobs.map((j) => j.toObject()),
      });
    } catch (error) {
      errorHandler(res, error, 'get all jobs controller');
    }
  }
}
