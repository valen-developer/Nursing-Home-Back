import { NotNull } from '../../../shared/domain/notNull';
import { ValueObject } from '../../../shared/domain/valueObject/valueObject.interface';

export class MenuDate extends NotNull implements ValueObject {
  public readonly value: Date;

  constructor(value: Date) {
    super(value, 'menu date');
    this.value = value;
  }

  public isSameDay(date: Date): boolean {
    return (
      this.value.getDate() === date.getDate() &&
      this.value.getMonth() === date.getMonth() &&
      this.value.getFullYear() === date.getFullYear()
    );
  }
}
