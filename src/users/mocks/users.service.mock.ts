import { User } from '@users/users.entity';
import { UsersService } from '@users/users.service';

export class UsersServiceMock {
  static getProvider() {
    return {
      provide: UsersService,
      useValue: UsersServiceMock.getInstance(),
    };
  }

  static getInstance() {
    return {
      findByEmail: () => Promise.resolve(),
      create: jest.fn((user: User) => Promise.resolve(user)),
    };
  }
}
