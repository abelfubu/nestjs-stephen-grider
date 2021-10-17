import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { Observable } from 'node_modules/rxjs/dist/types';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly usersService: UsersService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest();

    const { userId } = request.session || { userId: null };
    if (!userId) {
      return next.handle();
    }

    const user = await this.usersService.findOne(userId);
    if (!user) {
      return next.handle();
    }

    request.currentUser = user;
    return next.handle();
  }
}
