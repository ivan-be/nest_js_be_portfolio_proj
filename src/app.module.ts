import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '..', '.env'),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],

      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('HOST_LINK'),
        port: configService.get<number>('HOST_PORT'),
        username: configService.get<string>('HOST_USERNAME'),
        password: configService.get<string>('HOST_PASS'),
        database: configService.get<string>('HOST_DB_NAME'),
        synchronize: true,
        logging: true,
        autoLoadEntities: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
