import { asyncForEach } from "../../../helpers/asynForeach";
import { ImageRepository } from "../../shared/domain/interfaces/image.repository";
import { Activity } from "../domain/activity.model";
import { ActivityRepository } from "../domain/interfaces/ActivityRepository.interface";

export class ActivityFinder {
  constructor(
    private activityRepository: ActivityRepository,
    private imageRepository: ImageRepository
  ) {}

  async getByUuid(uuid: string): Promise<Activity> {
    const activity = await this.activityRepository.get(uuid);
    const images = await this.imageRepository.getByEntityUuid(
      activity.uuid.value
    );
    activity.setImages(images);

    return activity;
  }

  async getAll(): Promise<Activity[]> {
    const activities = await this.activityRepository.getAll();

    await asyncForEach<Activity>(activities, async (a) => {
      const images = await this.imageRepository.getByEntityUuid(a.uuid.value);
      a.setImages(images);
    });

    return activities;
  }
}
