import { HTTPException } from '../../../src/context/shared/domain/httpException';
import { User } from '../../../src/context/User/domain/user.model';
import { ROLE } from '../../../src/context/User/domain/valueObject/UserRol.valueObject';

describe('User instance', () => {
  const validEmail = 'valid@email.com';
  const invalidEmail = 'invalid';
  const validRole: ROLE = 'USER_ROLE';
  const invalidRole = 'invalid role';

  describe('when user email is not valid', () => {
    test('should throw an exception', () => {
      expect(() => {
        const user = new User({
          email: invalidEmail,
          name: 'name',
          role: validRole,
          uuid: 'ascasncasncnkla',
          validated: false,
        });
      }).toThrowError(HTTPException);
    });
  });

  describe('when user role is not valid role', () => {
    test('should throw an exception', () => {
      expect(() => {
        new User({
          email: validEmail,
          name: 'name',
          role: invalidRole as ROLE,
          uuid: 'alcnascknas',
          validated: true,
        });
      }).toThrowError(HTTPException);
    });
  });

  describe('when user name is not valid name', () => {
    test('should throw an exception', () => {
      expect(() => {
        new User({
          email: validEmail,
          name: '',
          role: invalidRole as ROLE,
          uuid: 'alcnascknas',
          validated: true,
        });
      }).toThrowError(HTTPException);
    });
  });

  describe('when user is valid user', () => {
    const generateValidUser = () => {
      return new User({
        email: validEmail,
        role: validRole,
        name: 'valid name',
        validated: true,
        uuid: 'ascnlasnkckasn',
      });
    };

    test('should not throw any exception', () => {
      expect(generateValidUser).not.toThrow(HTTPException);
    });
    const user = generateValidUser();

    test('should instance valid user', () => {
      expect(user).toBeInstanceOf(User);
    });
  });
});
