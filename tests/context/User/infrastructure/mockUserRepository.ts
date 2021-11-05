import { HTTPException } from '../../../../src/context/shared/domain/httpException';
import { UserRepository } from '../../../../src/context/User/domain/interfaces/user.repository';
import { User } from '../../../../src/context/User/domain/user.model';

export class MockUserRepository implements UserRepository {
  private database: User[] = [];

  public async save(user: User): Promise<void> {
    this.database.forEach((u) => {
      const duplicateUuid = u.uuid.value === user.uuid.value;
      const duplicateEmail = u.email.value === user.email.value;

      if (duplicateUuid)
        throw new HTTPException('mock user repository', 'uuid duplicate', 400);
      if (duplicateEmail)
        throw new HTTPException('mock user repository', 'email duplicate', 400);
    });

    this.database.push(user);
  }

  public async delete(uuid: string): Promise<boolean> {
    this.database = this.database.filter((u) => u.uuid.value !== uuid);
    return true;
  }

  public async get(uuid: string): Promise<User> {
    const user = this.database.find((u) => u.uuid.value === uuid);

    if (!user)
      throw new HTTPException('mock user repository', 'user not found', 404);

    return user;
  }

  public async getByEmail(email: string): Promise<User> {
    const user = this.database.find((u) => u.email.value === email);

    if (!user)
      throw new HTTPException('mock user repository', 'user not found', 404);

    return user;
  }

  public async getAll(): Promise<User[]> {
    return this.database;
  }

  update(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
