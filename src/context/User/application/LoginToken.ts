import { HTTPException } from '../../shared/domain/httpException';
import { UserCacheRepository } from '../domain/interfaces/UserCacheRepository.interface';
import { User } from '../domain/user.model';

export class LoginToken {
  constructor(private userCacheRepository: UserCacheRepository) {}

  public async login(uuid: string): Promise<User> {
    const user = await this.getFromCache(uuid);

    if (!user)
      throw new HTTPException('user from cache', 'not valid user', 401);

    return user;
  }

  private async getFromCache(uuid: string): Promise<User | null> {
    const userObject = await this.userCacheRepository.getUserByEmail(uuid);

    if (!userObject) return null;

    return new User(userObject);
  }
}
