import { UUID } from '../../shared/domain/valueObject/uuid.valueObject';
import { UserState } from './user-state/userState.state';
import { UserEmail } from './valueObject/UserEmail.valueObject';
import { UserImage } from './valueObject/UserImage.valueObject';
import { UserName } from './valueObject/UserName.valueObject';
import { UserPassword } from './valueObject/UserPassword.valueObject';
import { ROLE, UserROLE } from './valueObject/UserRol.valueObject';

export class User {
  public readonly uuid: UUID;
  public readonly name: UserName;
  public readonly email: UserEmail;
  public readonly password: UserPassword;

  private _role: UserROLE;
  private _userState: UserState;
  private _image: UserImage | null = null;

  constructor(userObject: UserObject) {
    this.uuid = new UUID(userObject.uuid);
    this.name = new UserName(userObject.name);
    this.email = new UserEmail(userObject.email);
    this.password = new UserPassword(userObject.password);
    this._role = new UserROLE(userObject.role);
    this._userState = UserState.fromBoolean(userObject.validated ?? false);
    this._image = new UserImage(userObject.image ?? '');
  }

  get validated(): boolean {
    return this._userState.validated;
  }
  get role(): UserROLE {
    return this._role;
  }

  get image(): UserImage | null {
    return this._image;
  }

  public toObject(): UserObject {
    return {
      uuid: this.uuid.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value ? this.password.value : '',
      role: this._role.value,
      validated: this.validated,
      image: this._image?.value,
    };
  }

  public toObjectWithoutPassword(): UserObject {
    return {
      uuid: this.uuid.value,
      name: this.name.value,
      email: this.email.value,
      role: this._role.value,
      validated: this.validated,
      image: this._image?.value,
    };
  }

  public validate(): void {
    this._userState = this._userState.validate(this.password.value);
  }

  public inValidate(): void {
    this._userState = this._userState.invalidate(this._role);
  }

  public turnAdminRole(): void {
    this._role = new UserROLE('ADMIN_ROLE');
  }

  public turnUserRole(): void {
    this._role = new UserROLE('USER_ROLE');
  }

  public setImagePath(path: string): void {
    this._image = new UserImage(path);
  }
}

export interface UserObject {
  uuid: string;
  name: string;
  email: string;
  password?: string;
  role: ROLE;
  validated: boolean;
  image?: string;
}
