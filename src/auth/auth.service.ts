import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.userName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 3;
    const salt = await bcrypt.genSalt(saltRounds);
    const password = createUserDto.password;

    if (!password) {
      throw new Error('Password is required');
    }
    if (!salt) {
      throw new Error('Salt is required');
    }

    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User();
    newUser.userName = createUserDto.userName;
    newUser.password = hashedPass;

    return await this.usersService.create(newUser);
  }
}
