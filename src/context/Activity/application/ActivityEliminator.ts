import { ImageRepository } from '../../shared/domain/interfaces/image.repository';
import { ActivityRepository } from '../domain/interfaces/ActivityRepository.interface';

export class ActivityEliminator {
  constructor(
    private activityRepository: ActivityRepository,
    private imageRepository: ImageRepository
  ) {}

  async delete(uuid: string): Promise<void> {
    await this.imageRepository.deleteAllByEntity(uuid);

    await this.activityRepository.delete(uuid);
  }
}
