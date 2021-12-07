import { asyncForEach } from '../../../helpers/asynForeach';
import { ImageRepository } from '../../shared/domain/interfaces/image.repository';
import { PlateRepository } from '../domain/interfaces/PlateRepository.interface';
import { Plate } from '../domain/plate.model';

export class PlateFinder {
  constructor(
    private plateRepository: PlateRepository,
    private imageRepository: ImageRepository
  ) {}

  public async findAll(): Promise<Plate[]> {
    const plates = await this.plateRepository.getPlates();

    await asyncForEach<Plate>(plates, async (plate) => {
      const images = await this.imageRepository.getByEntityUuid(
        plate.uuid.value
      );
      plate.setImages(images.map((image) => image.path.value));
    });

    return plates;
  }

  public async findByMenu(menuUuid: string): Promise<Plate[]> {
    const plates = await this.plateRepository.getPlatesByMenu(menuUuid);

    await asyncForEach<Plate>(plates, async (plate) => {
      const images = await this.imageRepository.getByEntityUuid(
        plate.uuid.value
      );
      plate.setImages(images.map((image) => image.path.value));
    });

    return plates;
  }

  public async findByUuid(uuid: string): Promise<Plate> {
    const plate = await this.plateRepository.getPlate(uuid);
    const images = await this.imageRepository.getByEntityUuid(plate.uuid.value);
    plate.setImages(images.map((image) => image.path.value));
    return plate;
  }

  public async findByDate(date: Date): Promise<Plate[]> {
    date = new Date(date);

    const plates = await this.plateRepository.getPlatesByDate(date);

    await asyncForEach<Plate>(plates, async (plate) => {
      const images = await this.imageRepository.getByEntityUuid(
        plate.uuid.value
      );
      plate.setImages(images.map((image) => image.path.value));
    });

    return plates;
  }
}
