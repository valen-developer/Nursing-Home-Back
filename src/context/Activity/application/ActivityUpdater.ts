import { asyncForEach } from '../../../helpers/asynForeach';
import { Image } from '../../shared/domain/image.model';
import { ImageRepository } from '../../shared/domain/interfaces/image.repository';
import { UuidGenerator } from '../../shared/infrastructure/uuidGenerator';
import { Activity } from '../domain/activity.model';
import { ActivityRepository } from '../domain/interfaces/ActivityRepository.interface';

export class ActivityUpdater {
  constructor(
    private readonly activityRepository: ActivityRepository,
    private imageRepository: ImageRepository,
    private uuid: UuidGenerator
  ) {}

  public async update(activity: Activity): Promise<Activity> {
    const updatedActivity = await this.activityRepository.update(activity);

    const images = activity.imagePaths.map(
      (path) =>
        new Image({
          path,
          uuid: this.uuid.generate(),
          entityUuid: activity.uuid.value,
        })
    );

    await asyncForEach<Image>(
      images,
      async (image) => await this.imageRepository.create(image)
    );

    return updatedActivity;
  }
}
