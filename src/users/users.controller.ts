import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Serialize } from '@decorators/serialize.decorator';
import { CreateUserDto, TokenResponse } from './models';
import { UserResponseDto } from './models/user.response.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Serialize(UserResponseDto)
  findAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  @Serialize(UserResponseDto)
  findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(Number(id));
  }

  @Post('signup')
  @Serialize(UserResponseDto)
  signup(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.create(user);
  }

  @Post('login')
  login(@Body() user: Omit<CreateUserDto, 'name'>): Promise<TokenResponse> {
    return this.usersService.login(user);
  }

  @Delete(':id')
  @Serialize(UserResponseDto)
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(Number(id));
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  update(@Param('id') id: string, @Body() user: Partial<CreateUserDto>): Promise<User> {
    return this.usersService.update(Number(id), user);
  }
}
