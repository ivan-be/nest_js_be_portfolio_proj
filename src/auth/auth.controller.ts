import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: CreateUserDto) {
    try {
      const newUser = await this.authService.signIn(signInDto);
      return {
        message: `Login successful! Welcome, ${signInDto.userName}`,
        user: newUser,
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registerDto: CreateUserDto) {
    try {
      const newUser = await this.authService.register(registerDto);
      return {
        message: 'User is successfully register',
        user: newUser,
      };
    } catch (error) {
      return { error: error.message };
    }
  }
}
