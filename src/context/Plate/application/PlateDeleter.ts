import { ImageDeleter } from '../../shared/application/imageDeleter';
import { PlateRepository } from '../domain/interfaces/PlateRepository.interface';

export class PlateDeleter {
  constructor(
    private readonly _plateRepository: PlateRepository,
    private imageDeleter: ImageDeleter
  ) {}

  async deletePlate(uuid: string): Promise<void> {
    await this.imageDeleter.deleteByEntityUuid(uuid);

    await this._plateRepository.deletePlate(uuid);
  }
}
