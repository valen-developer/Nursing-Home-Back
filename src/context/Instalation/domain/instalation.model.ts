import { ImagePath } from '../../shared/domain/valueObject/imagePath.valueObject';
import { UUID } from '../../shared/domain/valueObject/uuid.valueObject';
import { InstalationDescription } from './valueObject/instalationDescription.valueObject';
import { InstalationName } from './valueObject/instalationName.valueObject';

export class Instalation {
  public readonly uuid: UUID;
  public readonly name: InstalationName;
  public readonly description: InstalationDescription;
  public readonly imagePaths: ImagePath[] = [];

  constructor(instalation: InstalationObject) {
    this.uuid = new UUID(instalation.uuid);
    this.name = new InstalationName(instalation.name);
    this.description = new InstalationDescription(instalation.description);
    this.imagePaths = instalation.imagePaths.map((i) => new ImagePath(i));
  }

  public toObject(): InstalationObject {
    return {
      uuid: this.uuid.value,
      name: this.name.value,
      description: this.description.value,
      imagePaths: this.imagePaths.map((i) => i.value),
    };
  }
}

export interface InstalationObject {
  uuid: string;
  name: string;
  description: string;
  imagePaths: string[];
}
