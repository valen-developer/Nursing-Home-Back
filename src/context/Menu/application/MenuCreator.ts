import { MenuRepository } from '../domain/interfaces/menuRepository.interface';
import { Menu } from '../domain/Menu.model';

export class MenuCreator {
  constructor(private menuRepository: MenuRepository) {}

  public async create(menu: Menu) {
    return await this.menuRepository.create(menu);
  }
}
