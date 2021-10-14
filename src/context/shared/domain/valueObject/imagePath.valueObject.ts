import { ValueObject } from './valueObject.interface';

export class ImagePath implements ValueObject {
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
  }
}
