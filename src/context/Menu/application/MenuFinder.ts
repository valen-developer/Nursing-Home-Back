import { asyncForEach } from '../../../helpers/asynForeach';
import { PlateFinder } from '../../Plate/application/PlateFinder';
import { MenuRepository } from '../domain/interfaces/menuRepository.interface';
import { Menu } from '../domain/Menu.model';

export class MenuFinder {
  constructor(
    private menuRepository: MenuRepository,
    private plateFinder: PlateFinder
  ) {}

  async findAll(): Promise<Menu[]> {
    const menus = await this.menuRepository.findAll();

    await asyncForEach(menus, async (menu: Menu) => {
      const plates = await this.plateFinder.findByMenu(menu.uuid.value);
      menu.addPlates(plates);
    });

    return menus;
  }

  async findByDate(date: Date): Promise<Menu[]> {
    const menus = await this.menuRepository.findByDate(date);

    await asyncForEach(menus, async (menu: Menu) => {
      const plates = await this.plateFinder.findByMenu(menu.uuid.value);
      menu.addPlates(plates);
    });

    return menus;
  }

  async findByMonth(date: Date): Promise<Menu[]> {
    const menus = await this.menuRepository.findByMonth(date);

    await asyncForEach(menus, async (menu: Menu) => {
      const plates = await this.plateFinder.findByMenu(menu.uuid.value);
      menu.addPlates(plates);
    });

    return menus;
  }

  async findByUuid(uuid: string): Promise<Menu> {
    const menu = await this.menuRepository.findByUUID(uuid);
    const plates = await this.plateFinder.findByMenu(uuid);
    menu.addPlates(plates);

    return menu;
  }
}
