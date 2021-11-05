import { Request, Response } from 'express';
import { container } from '../../..';
import { ActivityFinder } from '../../../context/Activity/application/ActivityFinder';
import { errorHandler } from '../../../helpers/errorHandler';
import { ActivityUsesCases } from '../../dic/activityUsesCases.injector';

import { Controller } from '../controller.interface';

export class GetActivityController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { activity: uuid } = req.params;

    try {
      const activityFinder: ActivityFinder = container.get(
        ActivityUsesCases.ActivityFinder
      );

      const activity = await activityFinder.getByUuid(uuid);

      res.json({
        ok: true,
        activity: activity.toObject(),
      });
    } catch (error) {
      errorHandler(res, error, 'get activity controller');
    }
  }
}
