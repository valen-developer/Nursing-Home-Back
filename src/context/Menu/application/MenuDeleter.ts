import { PlateDeleter } from '../../Plate/application/PlateDeleter';
import { MenuRepository } from '../domain/interfaces/menuRepository.interface';

export class MenuDeleter {
  constructor(
    private menuRepository: MenuRepository,
    private plateDeleter: PlateDeleter
  ) {}

  async delete(uuid: string): Promise<void> {
    await this.plateDeleter.deleteByMenu(uuid);
    await this.menuRepository.delete(uuid);
  }
}
