import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateUserDtoExample } from './dtos/create-user-example.dto';
import { CreateUserResponseDto } from './dtos/CreateUserResponseDto';
import { ErrorResponseDto } from './dtos/ErrorResponeDto';

export const signInApi = [
  ApiOperation({ summary: 'Login user' }),
  ApiParam({
    name: 'none',
    description: "don't need to use params here",
  }),
  ApiBody({ type: CreateUserDtoExample }),
  ApiResponse({
    status: 201,
    description: 'Login is successfully',
    type: CreateUserResponseDto,
  }),
  ApiResponse({
    status: 400,
    description: 'Error during SignIn a user',
    type: ErrorResponseDto,
  }),
];

export function SignInApi() {
  return applyDecorators(...signInApi);
}

export const signUpApi = [
  ApiOperation({ summary: 'New user SignUp' }),
  ApiParam({
    name: 'none',
    description: "don't need to use params here",
  }),
  ApiBody({ type: CreateUserDtoExample }),
  ApiResponse({
    status: 201,
    description: 'User is successfully signUp',
    type: CreateUserResponseDto,
  }),
  ApiResponse({
    status: 400,
    description: 'Error during SignUP a user',
    type: ErrorResponseDto,
  }),
];

export function SignUpApi() {
  return applyDecorators(...signUpApi);
}
