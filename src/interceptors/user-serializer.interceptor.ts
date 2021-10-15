import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

@Injectable()
export class SerializerInterceptor<T> implements NestInterceptor {
  constructor(private readonly dto: ClassConstructor<T>) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<T | T[]> {
    const options: ClassTransformOptions = { excludeExtraneousValues: true };
    return next.handle().pipe(map(data => plainToClass(this.dto, data, options)));
  }
}
