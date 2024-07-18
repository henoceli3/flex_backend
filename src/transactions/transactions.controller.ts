import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsEntity } from './transactions.entity/transactions.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @HttpCode(200)
  @Get('all')
  async findAll() {
    return await this.transactionsService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(id: number) {
    return await this.transactionsService.findOne(id);
  }

  @HttpCode(200)
  @Post('create')
  async create(@Body('transaction') transaction: TransactionsEntity) {
    return await this.transactionsService.create(transaction);
  }

  @HttpCode(200)
  @Post('get-transactions-by-user')
  async getTransactionsByUser(@Body('id') id: number) {
    return await this.transactionsService.getTransactionsByUser(id);
  }
}
