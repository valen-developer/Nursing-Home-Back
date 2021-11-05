import { UserCacheRepository } from '../../../../src/context/User/domain/interfaces/UserCacheRepository.interface';
import {
  UserObject,
  User,
} from '../../../../src/context/User/domain/user.model';

export class MockUserCacheRepository implements UserCacheRepository {
  private database: databaseObject[] = [];

  public async getUserByEmail(email: string): Promise<UserObject | null> {
    const user = this.database.find((u) => u.key === email);

    if (!user) return null;

    return JSON.parse(user.value);
  }
  public async setUser(user: User): Promise<boolean> {
    this.database = this.database.filter((u) => u.key !== user.email.value);

    this.database.push({
      key: user.email.value,
      value: JSON.stringify(user.toObject()),
    });

    return true;
  }
}

interface databaseObject {
  key: string;
  value: string;
}
