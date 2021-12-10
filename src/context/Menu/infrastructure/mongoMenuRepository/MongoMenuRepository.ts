import { HTTPException } from '../../../shared/domain/httpException';
import { manageMongoError } from '../../../shared/infrastructure/manageMongoError';
import { MenuRepository } from '../../domain/interfaces/menuRepository.interface';
import { Menu, MenuObject } from '../../domain/Menu.model';
import { MenuMongoModel } from './MongoMenuModel';

export class MongoMenuRepository implements MenuRepository {
  public async findAll(): Promise<Menu[]> {
    try {
      const menus: MenuObject[] = await MenuMongoModel.find();
      return menus.map((menu: MenuObject) => new Menu(menu));
    } catch (error) {
      return [];
    }
  }

  public async findByDate(date: Date): Promise<Menu[]> {
    try {
      const menuObjects: MenuObject[] = await MenuMongoModel.find({
        date: {
          $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          $lt: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + 1
          ),
        },
      });

      return menuObjects.map((menuObject: MenuObject) => new Menu(menuObject));
    } catch (error) {
      return [];
    }
  }

  public async findByMonth(date: Date): Promise<Menu[]> {
    try {
      const menuObjects: MenuObject[] = await MenuMongoModel.find({
        date: {
          $gte: new Date(date.getFullYear(), date.getMonth(), 1),
          $lt: new Date(date.getFullYear(), date.getMonth() + 1, 1),
        },
      });

      return menuObjects.map((menuObject: MenuObject) => new Menu(menuObject));
    } catch (error) {
      return [];
    }
  }

  public async findByUUID(uuid: string): Promise<Menu> {
    try {
      const menu: MenuObject = await MenuMongoModel.findOne({ uuid });
      return new Menu(menu);
    } catch (error) {
      throw new HTTPException('menu mongo repository', 'Menu not found', 404);
    }
  }

  public async create(menu: Menu): Promise<Menu> {
    const menuMongoModel = new MenuMongoModel(menu.toObject());

    try {
      await menuMongoModel.save();
    } catch (error: any) {
      manageMongoError(error, 'menu mongo repository');
    }

    return menu;
  }

  public async update(menu: Menu): Promise<Menu> {
    try {
      await MenuMongoModel.updateOne(
        { uuid: menu.uuid.value },
        menu.toObject()
      );

      return menu;
    } catch (error) {
      throw new HTTPException('menu mongo repository', 'Menu not found', 404);
    }
  }

  public async delete(uuid: string): Promise<void> {
    try {
      await MenuMongoModel.deleteOne({ uuid });
    } catch (error) {
      throw new HTTPException('menu mongo repository', 'Menu not found', 404);
    }
  }
}
