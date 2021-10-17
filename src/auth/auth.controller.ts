import { CreateUserDto } from '@models/create-user.dto';
import { Body, Controller, HttpCode, Post, Session } from '@nestjs/common';
import { User } from '@users/users.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './models/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() user: CreateUserDto,
    @Session() session: { userId: number; admin: boolean },
  ): Promise<User> {
    const data = await this.authService.signup(user);
    session.userId = data.id;
    session.admin = data.admin;
    return data;
  }

  @Post('signout')
  @HttpCode(200)
  signout(@Session() session: { userId: number; admin: boolean }): void {
    session.userId = null;
    session.admin = null;
  }

  @Post('signin')
  @HttpCode(200)
  async signin(
    @Body() credentials: LoginDto,
    @Session() session: { userId: number; admin: boolean },
  ): Promise<User> {
    const user = await this.authService.signin(credentials);
    session.userId = user.id;
    session.admin = user.admin;
    return user;
  }
}
