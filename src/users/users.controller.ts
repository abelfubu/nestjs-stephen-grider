import { CurrentUser } from '@decorators/current-user.decorator';
import { Serialize } from '@decorators/serialize.decorator';
import { AuthGuard } from '@guards/auth.guard';
import { CreateUserDto } from '@models/create-user.dto';
import {
  Get,
  Body,
  Param,
  Patch,
  Delete,
  Session,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { UserResponseDto } from './models';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('auth')
@UseGuards(AuthGuard)
@Serialize(UserResponseDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get('whoami')
  whoami(@CurrentUser() user: User): User {
    return user;
  }

  @Get('cookie/:color')
  getCookie(
    @Param('color') color: string,
    @Session() session: { color: string },
  ): { color: string } {
    session.color = color;
    return session;
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: Partial<CreateUserDto>): Promise<User> {
    return this.usersService.update(Number(id), user);
  }
}
