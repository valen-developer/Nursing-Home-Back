import { HTTPException } from "../../shared/domain/httpException";
import { UserRepository } from "../domain/interfaces/user.repository";
import { UserCacheRepository } from "../domain/interfaces/UserCacheRepository.interface";
import { User } from "../domain/user.model";
import { UserFinder } from "./UserFinder";

export class LoginToken {
  constructor(
    private userCacheRepository: UserCacheRepository,
    private userFinder: UserFinder
  ) {}

  public async login(uuid: string): Promise<User> {
    let user = await this.getFromCache(uuid);

    if (!user) user = await this.userFinder.getUser(uuid);
    if (!user) throw new HTTPException("login token", "user not found", 404);

    return user;
  }

  private async getFromCache(uuid: string): Promise<User | null> {
    const userObject = await this.userCacheRepository.getUserByEmail(uuid);
    if (!userObject) return null;

    return new User(userObject);
  }
}
