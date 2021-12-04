import { NotNull } from '../../../shared/domain/notNull';
import { ValueObject } from '../../../shared/domain/valueObject/valueObject.interface';

export class PlateDescription extends NotNull implements ValueObject {
  public readonly value: string;

  constructor(value: string) {
    super(value, 'plate description');
    this.value = value;
  }
}
