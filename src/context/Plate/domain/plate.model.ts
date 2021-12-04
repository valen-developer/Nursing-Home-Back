import { ImagePath } from '../../shared/domain/valueObject/imagePath.valueObject';
import { UUID } from '../../shared/domain/valueObject/uuid.valueObject';
import { PlateDate } from './valueObjects/PlateDate.valueObject';
import { PlateDescription } from './valueObjects/PlateDescription.valueObject';
import { PlateName } from './valueObjects/PlateName.valueObject';
import { PlateReceipe } from './valueObjects/PlateReceipe.valueObject';

export class Plate {
  public readonly uuid: UUID;
  public readonly name: PlateName;
  public readonly description: PlateDescription;
  public readonly date: PlateDate;
  public readonly receipe: PlateReceipe;
  private _images: ImagePath[] = [];

  constructor(plate: PlateObject) {
    this.uuid = new UUID(plate.uuid);
    this.name = new PlateName(plate.name);
    this.description = new PlateDescription(plate.description);
    this.receipe = new PlateReceipe(plate.receipe);
    this.date = new PlateDate(plate.date);
    this._images = plate.imagePaths.map((image) => new ImagePath(image)) ?? [];
  }

  get imagePaths(): string[] {
    return this._images.map((imagePath) => imagePath.value);
  }

  public setImages(images: string[]): void {
    this._images = images.map((image) => new ImagePath(image));
  }

  public toObject(): PlateObject {
    return {
      uuid: this.uuid.value,
      name: this.name.value,
      description: this.description.value,
      receipe: this.receipe.value,
      date: this.date.value,
      imagePaths: this.imagePaths,
    };
  }
}

export interface PlateObject {
  uuid: string;
  name: string;
  description: string;
  imagePaths: string[];
  date: Date;
  receipe?: string | undefined | null;
}
