import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioEntity } from './dto/portfolio.entity';
import { PortfolioService } from './services/portfolio.service';
import { PortfolioController } from './controlers/portfolio.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioEntity]), UsersModule],
  providers: [PortfolioService],
  controllers: [PortfolioController],
})
export class PortfolioModule {}
