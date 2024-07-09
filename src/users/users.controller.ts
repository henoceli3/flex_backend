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
import * as path from 'path';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';
import { Request } from 'express';

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
      storage: diskStorage({
        destination: './uploads',
        filename: (req: Request, file: Express.Multer.File, cb: any) => {
          const filename: string = `${v4()}${path.extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async updatePhoto(
    @Param('id') id: number,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return await this.usersService.updatePhoto(id, photo.filename);
  }

  @Post('updateCni/:id')
  async updateCni(
    @Param('id') id: number,
    @Body('cni') cni: Express.Multer.File,
  ) {
    return await this.usersService.updateCni(id, cni.filename);
  }

  @Post('updateCniImage/:id')
  @UseInterceptors(
    FileInterceptor('cni_recto', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req: Request, file: Express.Multer.File, cb: any) => {
          const filename: string = `${v4()}${path.extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async updateCniImage(
    @Param('id') id: number,
    @UploadedFile() cni_recto: Express.Multer.File,
    @UploadedFile() cni_verso: Express.Multer.File,
  ) {
    return await this.usersService.updateCniImage(
      id,
      cni_recto.filename,
      cni_verso.filename,
    );
  }
}
