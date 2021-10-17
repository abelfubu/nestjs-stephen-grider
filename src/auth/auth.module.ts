import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from '@interceptors/auth.interceptor';

@Module({
  imports: [UsersModule],
  providers: [AuthService, { provide: APP_INTERCEPTOR, useClass: AuthInterceptor }],
  controllers: [AuthController],
})
export class AuthModule {}
