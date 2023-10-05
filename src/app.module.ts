import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ImageModule } from './image/image.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '..', '.env'),
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: 'https://coll-bucket.s3.eu-north-1.amazonaws.com/',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],

      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('HOST_NAME'),
        port: configService.get<number>('HOST_PORT'),
        username: configService.get<string>('HOST_USERNAME'),
        password: configService.get<string>('HOST_PASS'),
        database: configService.get<string>('HOST_DB'),
        synchronize: true,
        logging: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    AuthModule,
    PortfolioModule,
    ImageModule,
  ],
})
export class AppModule {}
