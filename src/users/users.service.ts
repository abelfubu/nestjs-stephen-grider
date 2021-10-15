import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './models/create-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: CreateUserDto): Promise<User> {
    const userExist = await this.findByEmail(user.email);
    if (userExist) {
      throw new BadRequestException('User Already Exist');
    }
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async login(user: Omit<CreateUserDto, 'name'>): Promise<{ token: string }> {
    const userExist = await this.findByEmail(user.email);
    if (!userExist) {
      throw new NotFoundException('User Not Found');
    }
    if (userExist.password !== user.password) {
      throw new UnauthorizedException('Password Incorrect');
    }
    return { token: 'token' };
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async update(id: number, attrs: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    Object.assign(user, attrs);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return this.userRepository.remove(user);
  }
}
