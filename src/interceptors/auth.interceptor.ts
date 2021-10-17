import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '@users/users.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly usersService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest();
    const userId = request.session.userId;
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
