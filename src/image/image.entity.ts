import { PortfolioEntity } from '../portfolio/dto/portfolio.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('image')
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PortfolioEntity, (portfolio) => portfolio.images)
  portfolio: PortfolioEntity;

  @Column()
  portfolioId: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  source: string;

  @Column({ default: '' })
  description: string;

  @Column('text', { default: [], array: true })
  comments: string[];
}
