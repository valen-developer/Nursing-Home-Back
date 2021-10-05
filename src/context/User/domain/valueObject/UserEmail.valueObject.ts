import { HTTPException } from '../../../shared/domain/httpException';
import { NotNull } from '../../../shared/domain/notNull';
import { ValueObject } from '../../../shared/domain/valueObject/valueObject.interface';

export class UserEmail extends NotNull implements ValueObject {
  public readonly value: string;

  constructor(value: string) {
    super(value, 'user email');
    this.value = value;

    this.isValid();
  }

  private isValid(): void {
    const isValidPassword = UserEmail.isValidEmail(this.value);
    if (!isValidPassword)
      throw new HTTPException(
        'user email',
        'user email is not a valid email',
        400
      );
  }

  public static isValidEmail(email: string): boolean {
    const regExp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    const isValidEmail = regExp.test(email);

    return isValidEmail;
  }
}
