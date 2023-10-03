import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseDto {
  @ApiProperty({ description: 'User ID' })
  id: number;

  @ApiProperty({ description: 'Username' })
  userName: string;

  @ApiProperty({ description: 'Access Token' })
  access_token: string;
}
