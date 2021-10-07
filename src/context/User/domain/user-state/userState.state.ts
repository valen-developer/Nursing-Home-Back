import { UserROLE } from '../valueObject/UserRol.valueObject';

import { InvalidValidatedUserStateChange } from './invalidValidatedUserStateChange.exception';

export abstract class UserState {
  public abstract readonly validated: boolean;

  constructor() {}

  public static create(): UserState {
    return new InvalidatedUser();
  }

  public validate(userPassword: string | null | undefined): UserState {
    return this;
  }

  public invalidate(userRole: UserROLE): UserState {
    return this;
  }

  public static fromBoolean(validated: boolean): UserState {
    if (validated) return new ValidatedUser();
    return new InvalidatedUser();
  }
}

export class ValidatedUser extends UserState {
  public readonly validated = true;

  public invalidate(userRole: UserROLE): UserState {
    if (!userRole.isAdminRole()) return new InvalidatedUser();
    throw new InvalidValidatedUserStateChange('user is admin');
  }
}

export class InvalidatedUser extends UserState {
  public readonly validated = false;

  public validate(userPassword: string): UserState {
    if (!userPassword)
      throw new InvalidValidatedUserStateChange('user has not password');
    return new ValidatedUser();
  }
}
