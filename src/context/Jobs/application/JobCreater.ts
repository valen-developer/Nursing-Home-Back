import { asyncForEach } from '../../../helpers/asynForeach';
import { Image } from '../../shared/domain/image.model';
import { ImageRepository } from '../../shared/domain/interfaces/image.repository';
import { UuidGenerator } from '../../shared/infrastructure/uuidGenerator';
import { JobRepository } from '../domain/interfaces/JobRepository.interface';
import { Job } from '../domain/job.model';

export class JobCreater {
  constructor(
    private jobRepository: JobRepository,
    private imageRepository: ImageRepository,
    private uuid: UuidGenerator
  ) {}

  public async create(job: Job): Promise<void> {
    await this.jobRepository.create(job);

    const images = job.imagePaths.map(
      (path) =>
        new Image({
          path,
          uuid: this.uuid.generate(),
          entityUuid: job.uuid.value,
        })
    );

    await asyncForEach<Image>(
      images,
      async (image) => await this.imageRepository.create(image)
    );
  }
}
