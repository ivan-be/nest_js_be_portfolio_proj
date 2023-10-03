import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioEntity } from '../dto/portfolio.entity';
import { Repository } from 'typeorm';
import { Observable, from } from 'rxjs';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(PortfolioEntity)
    private readonly portfolioRepository: Repository<PortfolioEntity>,
  ) {}

  create(createPortfolioDto: PortfolioEntity): Observable<PortfolioEntity> {
    return from(this.portfolioRepository.save(createPortfolioDto));
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
