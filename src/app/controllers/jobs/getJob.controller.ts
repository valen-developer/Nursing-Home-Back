import { Request, Response } from 'express';
import { container } from '../../..';
import { JobFinder } from '../../../context/Jobs/application/JobFinder';
import { errorHandler } from '../../../helpers/errorHandler';
import { JobUsesCases } from '../../dic/jobUsesCases.injector';

import { Controller } from '../controller.interface';

export class GetJobController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { jobUuid } = req.query;
    const uuid = jobUuid as string;

    try {
      const jobFinder: JobFinder = container.get(JobUsesCases.JobFinder);
      const job = await jobFinder.get(uuid);

      res.json({
        ok: true,
        job: job.toObject(),
      });
    } catch (error) {
      errorHandler(res, error, 'get job controller');
    }
  }
}
