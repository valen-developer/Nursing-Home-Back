import { ImageRepository } from '../../shared/domain/interfaces/image.repository';
import { InstalationRepository } from '../domain/interfaces/instalation.respository';

export class InstalationEliminator {
  constructor(
    private instalationRepository: InstalationRepository,
    private imageRepository: ImageRepository
  ) {}

  public async delete(uuid: string): Promise<void> {
    await this.imageRepository.deleteAllByEntity(uuid);

    return await this.instalationRepository.delete(uuid);
  }
}
