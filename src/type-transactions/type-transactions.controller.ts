import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { TypeTransactionsService } from './type-transactions.service';
import { TypeTransactionsEntity } from './type-transactions.entity/type-transactions.entity';

@Controller('type-transactions')
export class TypeTransactionsController {
  constructor(
    private readonly typeTransactionsService: TypeTransactionsService,
  ) {}

  @Get('/all')
  @HttpCode(200)
  async findAll() {
    return await this.typeTransactionsService.findAll();
  }

  @Get('all/:id')
  @HttpCode(200)
  async findOne(@Param('id') id: number) {
    return await this.typeTransactionsService.findOne(id);
  }

  @Post('/create')
  @HttpCode(200)
  async create(
    @Body('typeTransactions') typeTransactions: TypeTransactionsEntity,
  ) {
    return await this.typeTransactionsService.create(typeTransactions);
  }
}
