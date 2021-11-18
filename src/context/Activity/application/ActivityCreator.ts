import { asyncMap } from '../../../helpers/asyncMap';
import { asyncForEach } from '../../../helpers/asynForeach';
import { Image } from '../../shared/domain/image.model';
import { ImageRepository } from '../../shared/domain/interfaces/image.repository';
import { UuidGenerator } from '../../shared/infrastructure/uuidGenerator';
import { Activity } from '../domain/activity.model';
import { ActivityRepository } from '../domain/interfaces/ActivityRepository.interface';

export class ActivityCreator {
  constructor(
    private activityRepository: ActivityRepository,
    private imageRepository: ImageRepository,
    private uuid: UuidGenerator
  ) {}

  async create(activity: Activity): Promise<void> {
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

    return this.activityRepository.create(activity);
  }
}
