import { asyncForEach } from '../../../helpers/asynForeach';
import { Image } from '../../shared/domain/image.model';
import { ImageRepository } from '../../shared/domain/interfaces/image.repository';
import { UuidGenerator } from '../../shared/infrastructure/uuidGenerator';
import { Instalation } from '../domain/instalation.model';
import { InstalationRepository } from '../domain/interfaces/instalation.respository';

export class InstalationCreator {
  constructor(
    private instalationRepository: InstalationRepository,
    private imageRepository: ImageRepository,
    private uuid: UuidGenerator
  ) {}

  public async create(instalation: Instalation): Promise<void> {
    const images = instalation.imagePaths.map(
      (path) =>
        new Image({
          path: path.value,
          uuid: this.uuid.generate(),
          entityUuid: instalation.uuid.value,
        })
    );

    await asyncForEach<Image>(
      images,
      async (image) => await this.imageRepository.create(image)
    );

    await this.instalationRepository.create(instalation);
  }
}
