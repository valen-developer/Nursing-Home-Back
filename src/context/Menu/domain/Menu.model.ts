import { Plate, PlateObject } from '../../Plate/domain/plate.model';
import { UUID } from '../../shared/domain/valueObject/uuid.valueObject';
import { MenuDate } from './valueObjects/menuDate.valueObject';
import { MenuTitle } from './valueObjects/menuTitle.valueObject';

export class Menu {
  public readonly uuid: UUID;
  public readonly title: MenuTitle;
  public readonly date: MenuDate;
  private _plates: Plate[] = [];

  constructor(menu: MenuObject) {
    this.uuid = new UUID(menu.uuid);
    this.title = new MenuTitle(menu.title);
    this.date = new MenuDate(menu.date);
  }

  get plates(): Plate[] {
    return this._plates;
  }

  public toObject(): MenuObject {
    return {
      uuid: this.uuid.value,
      title: this.title.value,
      date: this.date.value,
      plates: this._plates.map((plate) => plate.toObject()),
    };
  }

  public addPlates(plates: Plate[]): void {
    this._plates = [...this._plates, ...this.checkPlates(plates)];
  }

  public checkPlates(plates: Plate[]): Plate[] {
    return plates.filter((plate) => this.date.isSameDay(plate.date.value));
  }
}

export interface MenuObject {
  uuid: string;
  title: string;
  date: Date;
  plates?: PlateObject[];
}
