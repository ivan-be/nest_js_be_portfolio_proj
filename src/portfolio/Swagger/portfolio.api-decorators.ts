import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '../../auth/Swagger/dtos/ErrorResponeDto';
import {
  CreatedPortfolioDto,
  CreatePortfolioDto,
  PortfolioDto,
  SuccessfulDeleteResponseDto,
  UnsuccessfulDeleteResponseDto,
} from './dto/portfolio-example.dto';

export const findAllApi = [
  ApiOperation({ summary: 'Get all portfolios for a user' }),
  ApiParam({
    name: 'userName',
    description: 'Username of the user whose portfolios to retrieve',
  }),
  ApiResponse({
    status: 200,
    description: 'Portfolios retrieved successfully',
    type: PortfolioDto,
    isArray: true,
  }),
];

export const createApi = [
  ApiOperation({ summary: 'Create a new portfolio for a user' }),
  ApiParam({
    name: 'userName',
    description: 'Username of the user to whom the portfolio belongs',
  }),
  ApiBody({ type: CreatePortfolioDto }),
  ApiResponse({
    status: 201,
    description: 'Portfolio created successfully',
    type: CreatedPortfolioDto,
  }),
  ApiResponse({
    status: 400,
    description: 'Error during portfolio creation',
    type: ErrorResponseDto,
  }),
];

export const removeApi = [
  ApiOperation({ summary: 'Delete a portfolio by ID' }),
  ApiParam({
    name: 'userName',
    description: 'Username of the user to whom the portfolio belongs',
  }),
  ApiParam({
    name: 'portfolioId',
    description: 'ID of the portfolio to delete',
  }),
  ApiResponse({
    status: 200,
    description: 'Portfolio deleted successfully',
    type: SuccessfulDeleteResponseDto,
  }),
  ApiResponse({
    status: 404,
    description: 'Portfolio not found',
    type: UnsuccessfulDeleteResponseDto,
  }),
];

export function FindAllApi() {
  return applyDecorators(...findAllApi);
}

export function CreateApi() {
  return applyDecorators(...createApi);
}

export function RemoveApi() {
  return applyDecorators(...removeApi);
}
