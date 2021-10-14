import { ImagePath } from '../../../shared/domain/valueObject/imagePath.valueObject';

export class UserImage extends ImagePath {
  constructor(value: string) {
    super(value);
  }
}
