import { HTTPException } from "../../../../src/context/shared/domain/httpException";
import { UserCreator } from "../../../../src/context/User/application/UserCreator";
import { UserEliminator } from "../../../../src/context/User/application/UserEliminator";
import { UserFinder } from "../../../../src/context/User/application/UserFinder";
import { User } from "../../../../src/context/User/domain/user.model";
import { FakeImageRepository } from "../../shared/infrastructure/fakeImageRepository";
import { MockUserRepository } from "../infrastructure/mockUserRepository";

describe("User Uses Cases", () => {
  const mockUserRepository = new MockUserRepository();
  const fakeImageRepository = new FakeImageRepository();

  describe("When save a user", () => {
    let user: User = new User({
      uuid: "aclkasncsna",
      email: "valid@email.com",
      name: "name",
      role: "USER_ROLE",
      validated: true,
    });

    test("should not throw any exception", () => {
      const userCreator = new UserCreator(mockUserRepository);

      expect(async () => {
        await userCreator.create(user);
      }).not.toThrowError(HTTPException);
    });

    test("should be able to found it by uuid", async () => {
      const userFinder = new UserFinder(
        mockUserRepository,
        fakeImageRepository
      );
      const userFound = await userFinder.getUser(user.uuid.value);

      expect(userFound).toEqual(user);
    });

    test("should be able to found it by email", async () => {
      const userFinder = new UserFinder(
        mockUserRepository,
        fakeImageRepository
      );
      const userFound = await userFinder.getByEmail(user.email.value);

      expect(userFound).toEqual(user);
    });

    test("should be able of delete it and not found again", async () => {
      const userDeleter = new UserEliminator(mockUserRepository);

      await expect(
        userDeleter.delete(user.uuid.value)
      ).resolves.not.toThrowError();

      const userFinder = new UserFinder(
        mockUserRepository,
        fakeImageRepository
      );

      await expect(userFinder.getUser(user.uuid.value)).rejects.toEqual(
        new HTTPException("mock user repository", "user not found", 404)
      );
    });
  });
});
