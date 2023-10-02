import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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

  async signIn(
    createUserDto: CreateUserDto,
  ): Promise<{ access_token: string }> {
    const { userName, password } = createUserDto;

    const user = await this.usersService.findOne(userName);

    if (!user) {
      throw new UnauthorizedException(
        'User not found. Please check your credentials',
      );
    }

    const isPasswordValid = await this.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Invalid credentials. Your data in incorrect',
      );
    }

    return { access_token: this.generateJwtToken(user) };
  }

  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ access_token: string }> {
    const userExists = await this.usersService.findOne(createUserDto.userName);

    if (userExists) {
      throw new UsernameAlreadyExistsException();
    }

    const hashedPassword = await this.hashPassword(createUserDto.password);

    const newUser = new User();
    newUser.userName = createUserDto.userName;
    newUser.password = hashedPassword;

    const savedUser = await this.usersService.create(newUser);

    return { access_token: this.generateJwtToken(savedUser) };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  private async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  private generateJwtToken(user: User): string {
    const payload = { sub: user.id, username: user.userName };
    return this.jwtService.sign(payload);
  }
}

export class UsernameAlreadyExistsException extends HttpException {
  constructor() {
    super('Username is already in use', HttpStatus.BAD_REQUEST);
  }
}
