import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { get } from 'http';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.findOne(userId);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Patch('/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.delete(userId);
  }
}
