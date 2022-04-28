import { Request, Response } from "express";

import { container } from "../../..";
import { ActivityFinder } from "../../../context/Activity/application/ActivityFinder";
import { errorHandler } from "../../../helpers/errorHandler";
import { ActivityUsesCases } from "../../dic/activityUsesCases.injector";

import { Controller } from "../controller.interface";

export class GetAllActivitiesController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    try {
      const activityFinder: ActivityFinder = container.get(
        ActivityUsesCases.ActivityFinder
      );

      const activities = await activityFinder.getAll();

      res.json({
        ok: true,
        activities: activities.map((a) => a.toObject()),
      });
    } catch (error) {
      errorHandler(res, error, "get all activities controller");
    }
  }
}
