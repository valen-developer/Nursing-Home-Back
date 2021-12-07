import { asyncForEach } from '../../../helpers/asynForeach';
import { ImageDeleter } from '../../shared/application/imageDeleter';
import { PlateRepository } from '../domain/interfaces/PlateRepository.interface';
import { Plate } from '../domain/plate.model';

export class PlateDeleter {
  constructor(
    private readonly _plateRepository: PlateRepository,
    private imageDeleter: ImageDeleter
  ) {}

  async deletePlate(uuid: string): Promise<void> {
    await this.imageDeleter.deleteByEntityUuid(uuid);

    await this._plateRepository.deletePlate(uuid);
  }

  async deleteByMenu(uuid: string): Promise<void> {
    const plates = await this._plateRepository.getPlatesByMenu(uuid);

    await asyncForEach<Plate>(plates, async (plate) => {
      await this.deletePlate(plate.uuid.value);
    });
  }
}
