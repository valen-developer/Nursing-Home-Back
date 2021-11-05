import { Activity } from '../domain/activity.model';
import { ActivityRepository } from '../domain/interfaces/ActivityRepository.interface';

export class ActivityFinder {
  constructor(private activityRepository: ActivityRepository) {}

  async getByUuid(uuid: string): Promise<Activity> {
    const activity = await this.activityRepository.get(uuid);
    return activity;
  }

  async getAll(): Promise<Activity[]> {
    const activities = await this.activityRepository.getAll();
    return activities;
  }
}
