import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersServiceMock } from '@users/mocks/users.service.mock';
import { User } from '@users/users.entity';
import { PasswordUtils } from '@utils/PasswordUtils';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const testUser = { email: 'abel@email.com', name: 'abel', password: '123456' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersServiceMock.getProvider()],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should signup a user', async () => {
    const returnPromise = Promise.resolve('hashPassword');
    jest.spyOn(PasswordUtils, 'hashPassword').mockReturnValue(returnPromise);
    const user = await service.signup(testUser);
    expect(user).toEqual({ ...testUser, password: 'hashPassword' });
  });

  it('should throw exception if user exist on signup', async () => {
    const returnPromise = Promise.resolve({} as User);
    jest.spyOn(service['usersService'], 'findByEmail').mockReturnValue(returnPromise);
    try {
      await service.signup(testUser);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('User Already Exist');
    }
  });

  it('should check credentials and return user', async () => {
    const userPromise = Promise.resolve(testUser as User);
    const passwordPromise = Promise.resolve(testUser.password);
    jest.spyOn(service['usersService'], 'findByEmail').mockReturnValue(userPromise);
    jest.spyOn(PasswordUtils, 'hashPassword').mockReturnValue(passwordPromise);
    const user = await service.signin(testUser);
    expect(user).toEqual(testUser);
  });

  it('should check credentials and throw exception if wrong password', async () => {
    jest
      .spyOn(service['usersService'], 'findByEmail')
      .mockReturnValue(Promise.resolve(testUser as User));
    jest
      .spyOn(PasswordUtils, 'hashPassword')
      .mockReturnValue(Promise.resolve('wrongPassword'));
    try {
      await service.signin({ ...testUser, password: 'wrongPassword' });
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });

  it('should check credentials and throw exception if user not found', async () => {
    jest
      .spyOn(service['usersService'], 'findByEmail')
      .mockReturnValue(Promise.resolve(undefined));
    try {
      await service.signin({ ...testUser, password: 'wrongPassword' });
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
