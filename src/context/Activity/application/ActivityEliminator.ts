import { ActivityRepository } from '../domain/interfaces/ActivityRepository.interface';

export class ActivityEliminator {
  constructor(private activityRepository: ActivityRepository) {}

  async delete(uuid: string): Promise<void> {
    await this.activityRepository.delete(uuid);
  }
}
