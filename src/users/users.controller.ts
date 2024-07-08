import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity/users.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 } from 'uuid';

@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) {}

  // @UseGuards(AuthGuard)
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

  @Post('restore/:id')
  async restore(@Param('id') id: number) {
    return await this.usersService.restore(id);
  }

  @Post('updatePassword/:id')
  async updatePassword(
    @Param('id') id: number,
    @Body('oldPassword') oldPassword: string,
    @Body('password') password: string,
  ) {
    return await this.usersService.updatePassword(id, oldPassword, password);
  }

  @Post('restorePassword/:id')
  async restorePassword(
    @Param('id') id: number,
    @Body('password') password: string,
  ) {
    return await this.usersService.restorePassword(id, password);
  }

  @Post('updatePhoto/:id')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: {
        destination: './uploads',
        filename: (req: Request, file: Express.Multer.File, cb: any) => {
          const filename: string = file.originalname;
          cb(null, file.fieldname, filename);
        },
      },
    }),
  )
  async updatePhoto(
    @Param('id') id: number,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    const photoName = v4() + '-' + photo.originalname;
    return await this.usersService.updatePhoto(id, photoName);
  }
}
