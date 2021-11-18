import { ImageDeleter } from '../../shared/application/imageDeleter';
import { ImageRepository } from '../../shared/domain/interfaces/image.repository';
import { JobRepository } from '../domain/interfaces/JobRepository.interface';

export class JobEliminator {
  constructor(
    private jobRepository: JobRepository,
    private imageDeleter: ImageDeleter
  ) {}

  public async delete(uuid: string): Promise<void> {
    await this.imageDeleter.deleteByEntityUuid(uuid);

    await this.jobRepository.delete(uuid);
  }
}
