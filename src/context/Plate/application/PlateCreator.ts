import { asyncForEach } from '../../../helpers/asynForeach';
import { Image } from '../../shared/domain/image.model';
import { ImageRepository } from '../../shared/domain/interfaces/image.repository';
import { UuidGenerator } from '../../shared/infrastructure/uuidGenerator';
import { PlateRepository } from '../domain/interfaces/PlateRepository.interface';
import { Plate } from '../domain/plate.model';

export class PlateCreator {
  constructor(
    private plateRepository: PlateRepository,
    private imageRepository: ImageRepository,
    private uuid: UuidGenerator
  ) {}

  public async create(plate: Plate): Promise<void> {
    await this.plateRepository.createPlate(plate);

    const images = plate.imagePaths.map((path) => {
      return new Image({
        path,
        entityUuid: plate.uuid.value,
        uuid: this.uuid.generate(),
      });
    });

    await asyncForEach<Image>(
      images,
      async (image) => await this.imageRepository.create(image)
    );
  }
}
