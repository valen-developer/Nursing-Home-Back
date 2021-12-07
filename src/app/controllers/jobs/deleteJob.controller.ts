import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { container } from '../../..';
import { JobEliminator } from '../../../context/Jobs/application/JobEliminator';
import { errorHandler } from '../../../helpers/errorHandler';
import { JobUsesCases } from '../../dic/jobUsesCases.injector';
import { Controller } from '../controller.interface';

export class DeleteJobController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    try {
      const jobDeleter: JobEliminator = container.get(
        JobUsesCases.JobEliminator
      );

      await jobDeleter.delete(uuid);

      res.json({ ok: true });
    } catch (error) {
      errorHandler(res, error, 'delete job controller');
    }
  }
}
