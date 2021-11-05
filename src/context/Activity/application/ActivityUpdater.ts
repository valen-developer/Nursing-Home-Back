import { Activity } from '../domain/activity.model';
import { ActivityRepository } from '../domain/interfaces/ActivityRepository.interface';

export class ActivityUpdater {
  constructor(private readonly activityRepository: ActivityRepository) {}

  public async update(activity: Activity): Promise<Activity> {
    return await this.activityRepository.update(activity);
  }
}
