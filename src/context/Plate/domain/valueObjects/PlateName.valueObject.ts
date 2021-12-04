import { NotNull } from '../../../shared/domain/notNull';
import { ValueObject } from '../../../shared/domain/valueObject/valueObject.interface';

export class PlateName extends NotNull implements ValueObject {
  public readonly value: string;

  constructor(value: string) {
    super(value, 'plate name');
    this.value = value;
  }
}
