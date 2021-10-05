import { HTTPException } from '../../../shared/domain/httpException';
import { NotNull } from '../../../shared/domain/notNull';
import { ValueObject } from '../../../shared/domain/valueObject/valueObject.interface';

export class UserName extends NotNull implements ValueObject {
  public readonly value: string;

  constructor(value: string) {
    super(value, 'user name');
    this.value = value;
  }
}
