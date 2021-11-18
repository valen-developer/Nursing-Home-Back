import { ImageDeleter } from '../../shared/application/imageDeleter';
import { ImageRepository } from '../../shared/domain/interfaces/image.repository';
import { InstalationRepository } from '../domain/interfaces/instalation.respository';

export class InstalationEliminator {
  constructor(
    private instalationRepository: InstalationRepository,
    private imageDeleter: ImageDeleter
  ) {}

  public async delete(uuid: string): Promise<void> {
    await this.imageDeleter.deleteByEntityUuid(uuid);

    return await this.instalationRepository.delete(uuid);
  }
}
