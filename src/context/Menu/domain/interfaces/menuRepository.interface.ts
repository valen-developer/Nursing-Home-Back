import { Menu } from '../Menu.model';

export abstract class MenuRepository {
  abstract findAll(): Promise<Menu[]>;
  abstract findByUUID(uuid: string): Promise<Menu>;
  abstract findByDate(date: Date): Promise<Menu[]>;
  abstract findByMonth(date: Date): Promise<Menu[]>;
  abstract create(menu: Menu): Promise<Menu>;
  abstract update(menu: Menu): Promise<Menu>;
  abstract delete(uuid: string): Promise<void>;
}
