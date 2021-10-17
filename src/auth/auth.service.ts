import { CreateUserDto } from '@models/create-user.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@users/users.entity';
import { UsersService } from '@users/users.service';
import { PasswordUtils } from '@utils/PasswordUtils';
import { LoginDto } from './models/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(user: CreateUserDto): Promise<User> {
    const userExist = await this.usersService.findByEmail(user.email);
    if (userExist) {
      throw new BadRequestException('User Already Exist');
    }
    const salt = PasswordUtils.generateSalt();
    const hashedPassword = await PasswordUtils.hashPassword(user.password, salt);
    return await this.usersService.create({ ...user, password: hashedPassword });
  }

  async signin(user: LoginDto): Promise<User> {
    const existingUser = await this.usersService.findByEmail(user.email);
    if (!existingUser) {
      throw new NotFoundException('User Not Found');
    }
    const salt = PasswordUtils.getPasswordSalt(existingUser.password);
    const hashedPassword = await PasswordUtils.hashPassword(user.password, salt);
    if (existingUser.password !== hashedPassword) {
      throw new UnauthorizedException('Password Incorrect');
    }
    return existingUser;
  }
}
