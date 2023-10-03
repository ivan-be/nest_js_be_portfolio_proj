import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.auth-guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string): Promise<User> {
    return this.usersService.findOne(name);
  }

  @Get(':id')
  findOneById(@Param('id') id: number): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async delete(@Req() req: any) {
    try {
      await this.usersService.deleteUser(req.user.id);
      return { message: 'User deleted successfully' };
    } catch (e) {
      return { error: e.message };
    }
  }
}
