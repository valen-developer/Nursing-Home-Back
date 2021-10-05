import { UserRepository } from '../domain/interfaces/user.repository';
import { User } from '../domain/user.model';

export class UserFinder {
  constructor(private userRepository: UserRepository) {}

  public async getUser(uuid: string): Promise<User> {
    return await this.userRepository.get(uuid);
  }

  public async getByEmail(email: string): Promise<User> {
    return await this.userRepository.getByEmail(email);
  }

  public async getAll(): Promise<User[]> {
    return await this.userRepository.getAll();
  }
}
