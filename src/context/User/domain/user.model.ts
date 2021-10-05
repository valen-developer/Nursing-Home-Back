import { UUID } from '../../shared/domain/valueObject/uuid.valueObject';
import { UserEmail } from './valueObject/UserEmail.valueObject';
import { UserName } from './valueObject/UserName.valueObject';
import { UserPassword } from './valueObject/UserPassword.valueObject';
import { ROLE, UserROLE } from './valueObject/UserRol.valueObject';

export class User {
  public readonly uuid: UUID;
  public readonly name: UserName;
  public readonly email: UserEmail;
  public readonly password: UserPassword;

  private _role: UserROLE;
  private _validated = false;

  constructor(
    uuid: string,
    name: string,
    email: string,
    password: string | null | undefined,
    role: ROLE,
    validated = false
  ) {
    this.uuid = new UUID(uuid);
    this.name = new UserName(name);
    this.email = new UserEmail(email);
    this.password = new UserPassword(password);
    this._role = new UserROLE(role);
    this._validated = validated;
  }

  get validated(): boolean {
    return this._validated;
  }
  get role(): UserROLE {
    return this._role;
  }

  public toObject(): UserObject {
    return {
      uuid: this.uuid.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value ? this.password.value : '',
      role: this._role.value,
      validated: this.validated,
    };
  }

  public toObjectWithoutPassword(): UserObject {
    return {
      uuid: this.uuid.value,
      name: this.name.value,
      email: this.email.value,
      role: this._role.value,
      validated: this.validated,
    };
  }

  public validate(): void {
    this._validated = true;
  }

  public inValidate(): void {
    this._validated = false;
  }

  public turnAdminRole(): void {
    this._role = new UserROLE('ADMIN_ROLE');
  }

  public turnUserRole(): void {
    this._role = new UserROLE('USER_ROLE');
  }
}

export interface UserObject {
  uuid: string;
  name: string;
  email: string;
  password?: string;
  role: ROLE;
  validated: boolean;
}
