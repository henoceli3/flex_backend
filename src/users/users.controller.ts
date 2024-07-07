import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity/users.entity';

@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) {}

  @Get('All')
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }

  @Post('create')
  async create(@Body('user') user: UsersEntity) {
    return await this.usersService.create(user);
  }

  @Post('update/:id')
  async update(@Param('id') id: number, @Body('user') user: UsersEntity) {
    return await this.usersService.update(id, user);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return await this.usersService.remove(id);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.usersService.login(email, password);
  }
}
