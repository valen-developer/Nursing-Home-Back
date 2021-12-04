import { NotNull } from '../../../shared/domain/notNull';
import { ValueObject } from '../../../shared/domain/valueObject/valueObject.interface';

export class PlateDate extends NotNull implements ValueObject {
  public readonly value: Date;

  constructor(value: Date) {
    super(value, 'plate date');
    this.value = value;
  }
}
