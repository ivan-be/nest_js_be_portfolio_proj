import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDtoExample {
  @ApiProperty({ example: 'Ivan_the_vulvaCharger' })
  userName: string;

  @ApiProperty({ example: 'pussyConqueror1488' })
  password: string;
}
