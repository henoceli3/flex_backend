import { Module } from '@nestjs/common';
import { TypeTransactionsService } from './type-transactions.service';
import { TypeTransactionsController } from './type-transactions.controller';

@Module({
  providers: [TypeTransactionsService],
  controllers: [TypeTransactionsController]
})
export class TypeTransactionsModule {}
