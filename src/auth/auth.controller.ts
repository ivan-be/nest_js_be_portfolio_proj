import {Body, Controller, HttpException, HttpStatus, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignInApi, SignUpApi } from './Swagger/ApiDecorators';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signIn')
  @SignInApi()
  async signIn(@Body() signInDto: CreateUserDto) {
    try {
      const newUser = await this.authService.signIn(signInDto);
      return {
        message: `Login successful! Welcome, ${signInDto.userName}`,
        user: newUser,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('signUp')
  @SignUpApi()
  async signUp(@Body() registerDto: CreateUserDto) {
    try {
      const newUser = await this.authService.signUp(registerDto);
      return {
        message: 'User is successfully register',
        user: newUser,
      };
    } catch (error) {
      return { error: error.message };
    }
  }
}
