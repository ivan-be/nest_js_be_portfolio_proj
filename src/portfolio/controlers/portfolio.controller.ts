import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PortfolioService } from '../services/portfolio.service';
import { PortfolioEntity } from '../dto/portfolio.entity';

@Controller('users/:userName/portfolio')
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @Get()
  async findAll(
    @Param('userName') userName: string,
  ): Promise<PortfolioEntity[]> {
    const user = await this.portfolioService.findUserByUserName(userName);
    return this.portfolioService.findAll(user.id);
  }

  @Post()
  async create(
    @Param('userName') userName: string,
    @Body() portfolio: PortfolioEntity,
  ) {
    const user = await this.portfolioService.findUserByUserName(userName);
    const portfolioData = {
      name: portfolio.name,
      description: portfolio.description,
      userId: user.id,
    };
    return await this.portfolioService.create(portfolioData);
  }

  @Delete(':portfolioId')
  remove(@Param('portfolioId') portfolioId) {
    return this.portfolioService.remove(portfolioId);
  }
}
