import { User, UserObject } from '../user.model';

export abstract class UserCacheRepository {
  public abstract getUserByEmail(email: string): Promise<UserObject | null>;
  public abstract setUser(user: User): Promise<boolean>;
}
