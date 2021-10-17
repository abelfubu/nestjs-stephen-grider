/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateUserDto } from '@models/create-user.dto';
import { User } from '@users/users.entity';
import { AuthService } from '../auth.service';
import { LoginDto } from '../models/login.dto';

export class AuthServiceMock {
  user = {
    id: '1',
    name: 'Test',
    email: 'test@test.com',
    password: 'test',
  };

  static getProvider() {
    return {
      provide: AuthService,
      useValue: AuthServiceMock.getInstance(),
    };
  }

  static getInstance(): Partial<AuthService> {
    return {
      signup(_user: CreateUserDto): Promise<User> {
        return Promise.resolve(this.user);
      },

      signin(_user: LoginDto): Promise<User> {
        return Promise.resolve(this.user);
      },
    };
  }
}
