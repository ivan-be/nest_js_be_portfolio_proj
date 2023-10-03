import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioEntity } from '../dto/portfolio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(PortfolioEntity)
    private readonly portfolioRepository: Repository<PortfolioEntity>,
  ) {}

  create(createPortfolioDto: PortfolioEntity): Promise<PortfolioEntity> {
    return this.portfolioRepository.save(createPortfolioDto);
  }

  async findAll(userId): Promise<PortfolioEntity[]> {
    return this.portfolioRepository.find({ where: [{ userId: userId }] });
  }

  findOne(id: number): Promise<PortfolioEntity> {
    return this.portfolioRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.portfolioRepository.delete(id);
  }
}
