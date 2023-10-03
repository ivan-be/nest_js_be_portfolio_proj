import { PortfolioEntity } from 'src/portfolio/dto/portfolio.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @OneToMany(() => PortfolioEntity, (portfolio) => portfolio.user)
  portfolios: PortfolioEntity[];
}
