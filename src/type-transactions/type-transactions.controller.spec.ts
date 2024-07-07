import { Test, TestingModule } from '@nestjs/testing';
import { TypeTransactionsController } from './type-transactions.controller';

describe('TypeTransactionsController', () => {
  let controller: TypeTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeTransactionsController],
    }).compile();

    controller = module.get<TypeTransactionsController>(TypeTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
