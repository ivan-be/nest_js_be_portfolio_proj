import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    const createdUser = this.usersRepository.create(user);
    return await this.usersRepository.save(createdUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async findOne(userName: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { userName } });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async deleteUser(id: number): Promise<void> {
    const user = this.findOneById(id);

    if (!user) {
      throw new NotFoundException();
    }

    await this.usersRepository.delete(id);
  }
}
