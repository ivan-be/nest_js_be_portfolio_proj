import { ApiProperty } from '@nestjs/swagger';

export class PortfolioDto {
  @ApiProperty({ description: 'Portfolio ID', example: 4 })
  id: number;

  @ApiProperty({ description: 'User ID', example: 1 })
  userId: number;

  @ApiProperty({
    description: 'Portfolio Name',
    example: 'How many likes can this photo collect?',
  })
  name: string;

  @ApiProperty({
    description: 'Portfolio Description',
    example: 'There was a photo, I swear',
  })
  description: string;
}

export class CreatePortfolioDto {
  @ApiProperty({
    description: 'Name of the portfolio',
    example: 'How many likes can this photo collect?',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the portfolio',
    example: 'There was a photo, I swear',
  })
  description: string;
}

export class CreatedPortfolioDto {
  @ApiProperty({
    description: 'Name of the portfolio',
    example: 'How many likes can this photo collect?',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the portfolio',
    example: 'There was a photo, I swear',
  })
  description: string;

  @ApiProperty({ description: 'User ID', example: 1 })
  userId: number;

  @ApiProperty({ description: 'Portfolio ID', example: 16 })
  id: number;
}

export class UnsuccessfulDeleteResponseDto {
  @ApiProperty({ example: 'Portfolio not found' })
  message: string;
}

export class SuccessfulDeleteResponseDto {
  @ApiProperty({ example: 'Portfolio deleted successfully' })
  message: string;
}
