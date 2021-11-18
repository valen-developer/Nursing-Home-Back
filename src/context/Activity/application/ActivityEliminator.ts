import { ImageDeleter } from '../../shared/application/imageDeleter';
import { ImageRepository } from '../../shared/domain/interfaces/image.repository';
import { ActivityRepository } from '../domain/interfaces/ActivityRepository.interface';

export class ActivityEliminator {
  constructor(
    private activityRepository: ActivityRepository,
    private imageDeleter: ImageDeleter
  ) {}

  async delete(uuid: string): Promise<void> {
    await this.imageDeleter.deleteByEntityUuid(uuid);
    await this.activityRepository.delete(uuid);
  }
}
