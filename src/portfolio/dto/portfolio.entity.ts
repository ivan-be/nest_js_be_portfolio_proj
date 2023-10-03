import { ImageEntity } from 'src/image/image.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('portfolio')
export class PortfolioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.portfolios)
  user: User;

  @Column()
  userId: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  description: string;

  @OneToMany(() => ImageEntity, (image) => image.portfolio)
  images: ImageEntity[];
}
