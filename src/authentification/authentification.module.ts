import { Module } from '@nestjs/common';
import { AuthentificationController } from './authentification.controller';
import { AuthentificationService } from './authentification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/users.entity/users.entity';
import { HelperService } from 'src/helper/helper.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [AuthentificationController],
  providers: [AuthentificationService, HelperService],
})
export class AuthentificationModule {}
