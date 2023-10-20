import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PortfolioService } from '../services/portfolio.service';
import { PortfolioEntity } from '../dto/portfolio.entity';
import {
  CreateApi,
  FindAllApi,
  RemoveApi,
} from '../Swagger/portfolio.api-decorators';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth/jwt.auth-guard';

@Controller('users/:userName/portfolio')
@ApiTags('portfolio')
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @Get()
  @FindAllApi()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Param('userName') userName: string,
  ): Promise<PortfolioEntity[]> {
    const user = await this.portfolioService.findUserByUserName(userName);
    return this.portfolioService.findAll(user.id);
  }

  @Post()
  @CreateApi()
  @UseGuards(JwtAuthGuard)
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

  @RemoveApi()
  @Delete(':portfolioId')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('portfolioId') portfolioId: number) {
    try {
      await this.portfolioService.remove(portfolioId);
      return { message: 'Portfolio deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
