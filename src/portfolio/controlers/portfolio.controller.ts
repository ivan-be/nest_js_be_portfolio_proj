import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { PortfolioService } from '../services/portfolio.service';
import { PortfolioEntity } from '../dto/portfolio.entity';

@Controller('users/:userId/portfolio')
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @Get()
  findAll(@Param('userId') userId): Promise<PortfolioEntity[]> {
    return this.portfolioService.findAll(userId);
  }
  @Post()
  create(@Param('userId') userId, @Body() portfolio: PortfolioEntity) {
    return this.portfolioService.create({ ...portfolio, userId });
  }
  @Delete(':portfolioId')
  remove(@Param('portfolioId') portfolioId) {
    return this.portfolioService.remove(portfolioId);
  }
}
