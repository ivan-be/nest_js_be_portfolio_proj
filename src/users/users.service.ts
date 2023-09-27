import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 3;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPass = await bcrypt.hash(createUserDto.password, salt);

    const newUser = this.usersRepository.create({
      userName: createUserDto.userName,
      password: hashedPass,
    });

    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async findOne(userName: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { userName } });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
