import { ValueObject } from '../../../shared/domain/valueObject/valueObject.interface';

export class InstalationName implements ValueObject {
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
  }
}
