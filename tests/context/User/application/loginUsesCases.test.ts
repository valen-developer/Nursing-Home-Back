import { Bcrypt } from "../../../../src/context/shared/infrastructure/bcrypt.crypt";
import { LoginUser } from "../../../../src/context/User/application/LoginUser";
import { UserFinder } from "../../../../src/context/User/application/UserFinder";
import { FakeImageRepository } from "../../shared/infrastructure/fakeImageRepository";
import { MockUserCacheRepository } from "../infrastructure/mockCacheRepository";
import { MockUserRepository } from "../infrastructure/mockUserRepository";

describe("When user make login", () => {
  const mockUserRepository = new MockUserRepository();
  const mockCacheUserRepository = new MockUserCacheRepository();
  const fakeImageRepository = new FakeImageRepository();
  const crypt = new Bcrypt();

  const userFinder = new UserFinder(mockUserRepository, fakeImageRepository);

  test("should return a valid user", () => {
    const userLogin = new LoginUser(mockCacheUserRepository, userFinder, crypt);
  });
});
