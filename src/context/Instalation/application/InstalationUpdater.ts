import { asyncForEach } from '../../../helpers/asynForeach';
import { Image } from '../../shared/domain/image.model';
import { ImageRepository } from '../../shared/domain/interfaces/image.repository';
import { UuidGenerator } from '../../shared/infrastructure/uuidGenerator';
import { Instalation } from '../domain/instalation.model';
import { InstalationRepository } from '../domain/interfaces/instalation.respository';

export class InstalationUpdater {
  constructor(
    private instalationRepository: InstalationRepository,
    private imageRepository: ImageRepository,
    private uuid: UuidGenerator
  ) {}

  public async update(instalation: Instalation): Promise<Instalation> {
    const updatedInstalation = await this.instalationRepository.update(
      instalation
    );

    const images = instalation.imagePaths.map(
      (path) =>
        new Image({
          path,
          uuid: this.uuid.generate(),
          entityUuid: instalation.uuid.value,
        })
    );

    await asyncForEach<Image>(
      images,
      async (image) => await this.imageRepository.create(image)
    );

    return updatedInstalation;
  }
}
