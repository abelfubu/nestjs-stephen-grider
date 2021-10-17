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
    @Session() session: { userId: number },
  ): Promise<User> {
    const data = await this.authService.signup(user);
    session.userId = data.id;
    return data;
  }

  @Post('signout')
  @HttpCode(200)
  signout(@Session() session: { userId: number }): void {
    session.userId = null;
  }

  @Post('signin')
  @HttpCode(200)
  async signin(
    @Body() credentials: LoginDto,
    @Session() session: { userId: number },
  ): Promise<User> {
    const user = await this.authService.signin(credentials);
    session.userId = user.id;
    return user;
  }
}
