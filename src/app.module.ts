import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from '@reports/reports.entity';
import { ReportsModule } from '@reports/reports.module';
import { User } from '@users/users.entity';
import { UsersModule } from '@users/users.module';
import { SessionModule } from 'nestjs-session';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ReportsModule,
    ConfigService,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log(config.get('DB_NAME'));
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: config.get<string>('DB_NAME'),
          synchronize: true,
          entities: [User, Report],
          keepConnectionAlive: true,
        };
      },
    }),
    SessionModule.forRoot({ session: { secret: 'elgrajovuelabajo' } }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
  ],
})
export class AppModule {}
