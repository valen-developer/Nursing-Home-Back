import { ImageRepository } from '../../shared/domain/interfaces/image.repository';
import { JobRepository } from '../domain/interfaces/JobRepository.interface';

export class JobEliminator {
  constructor(
    private jobRepository: JobRepository,
    private imageRepository: ImageRepository
  ) {}

  public async delete(uuid: string): Promise<void> {
    await this.imageRepository.deleteAllByEntity(uuid);

    await this.jobRepository.delete(uuid);
  }
}
