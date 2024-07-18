import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionsEntity } from './transactions.entity/transactions.entity';
import { HelperService } from 'src/helper/helper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/users.entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionsEntity, UsersEntity])],
  controllers: [TransactionsController],
  providers: [TransactionsService, HelperService],
})
export class TransactionsModule {}
