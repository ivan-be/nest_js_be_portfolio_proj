import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDtoExample {
  @ApiProperty({ example: 'Ivan' })
  userName: string;

  @ApiProperty({ example: 'hdolfaitler' })
  password: string;
}
