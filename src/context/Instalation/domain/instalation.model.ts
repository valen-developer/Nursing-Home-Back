import { Image, ImageObject } from "../../shared/domain/image.model";
import { ImagePath } from "../../shared/domain/valueObject/imagePath.valueObject";
import { UUID } from "../../shared/domain/valueObject/uuid.valueObject";
import { InstalationDescription } from "./valueObject/instalationDescription.valueObject";
import { InstalationName } from "./valueObject/instalationName.valueObject";

export class Instalation {
  public readonly uuid: UUID;
  public readonly name: InstalationName;
  public readonly description: InstalationDescription;
  private _images: Image[] = [];
  private _imagePaths: ImagePath[] = [];

  constructor(instalation: InstalationObject) {
    this.uuid = new UUID(instalation.uuid);
    this.name = new InstalationName(instalation.name);
    this.description = new InstalationDescription(instalation.description);
    this._imagePaths = instalation.imagePaths.map((i) => new ImagePath(i));
  }

  get imagePaths(): string[] {
    return this._imagePaths.map((i) => i.value);
  }

  get images(): Image[] {
    return this._images;
  }

  public toObject(): InstalationObject {
    return {
      uuid: this.uuid.value,
      name: this.name.value,
      description: this.description.value,
      imagePaths: this.imagePaths,
      images: this.images.map((i) => i.toObject()),
    };
  }

  public setImages(images: Image[]): void {
    this._imagePaths = images.map((i) => i.path);
    this._images = images;
  }
}

export interface InstalationObject {
  uuid: string;
  name: string;
  description: string;
  imagePaths: string[];
  images?: ImageObject[];
}
