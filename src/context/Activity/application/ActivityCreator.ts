import { Activity } from '../domain/activity.model';
import { ActivityRepository } from '../domain/interfaces/ActivityRepository.interface';

export class ActivityCreator {
  constructor(private activityRepository: ActivityRepository) {}

  async create(activity: Activity) {
    return this.activityRepository.create(activity);
  }
}
