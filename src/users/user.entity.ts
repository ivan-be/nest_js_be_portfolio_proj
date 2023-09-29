import { PortfolioEntity } from 'src/portfolio/dto/portfolio.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => PortfolioEntity, (portfolio) => portfolio.user)
  portfolios: PortfolioEntity[];
}
