import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioEntity } from '../dto/portfolio.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user.entity';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(PortfolioEntity)
    private readonly portfolioRepository: Repository<PortfolioEntity>,
    private readonly usersService: UsersService,
  ) {}

  async create(createPortfolioDto: {
    name: string;
    description: string;
    userId: number;
  }): Promise<PortfolioEntity> {
    return this.portfolioRepository.save(createPortfolioDto);
  }

  async findAll(userId): Promise<PortfolioEntity[]> {
    return this.portfolioRepository.find({ where: [{ userId: userId }] });
  }

  async findOne(id: number): Promise<PortfolioEntity> {
    return this.portfolioRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.portfolioRepository.delete(id);
  }

  async findUserByUserName(userName: string): Promise<User> {
    return await this.usersService.findOne(userName);
  }
}
