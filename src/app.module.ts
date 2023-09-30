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
        host: 'localhost',
        port: 5431,
        username: 'pasha_kuraksin',
        password: 'postgre_pasha_password',
        database: 'my_postgres_db_pasha',
        synchronize: true,
        logging: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
