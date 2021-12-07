import { MenuRepository } from '../domain/interfaces/menuRepository.interface';
import { Menu } from '../domain/Menu.model';

export class MenuUpdater {
  constructor(private menuRepository: MenuRepository) {}

  public async update(menu: Menu) {
    await this.menuRepository.update(menu);
  }
}
