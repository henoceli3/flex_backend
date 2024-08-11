import { Module } from '@nestjs/common';
import { TypeTransactionsService } from './type-transactions.service';
import { TypeTransactionsController } from './type-transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeTransactionsEntity } from './type-transactions.entity/type-transactions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeTransactionsEntity])],
  providers: [TypeTransactionsService],
  controllers: [TypeTransactionsController],
})
export class TypeTransactionsModule {}
