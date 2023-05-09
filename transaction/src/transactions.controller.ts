import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  ITransactionService,
  TRANSACTION_SERVICE_TOKEN,
} from './interfaces/transaction.service';

@Controller()
export class TransactionsController {
  constructor(
    @Inject(TRANSACTION_SERVICE_TOKEN)
    private readonly transactionsService: ITransactionService,
  ) {}

  @MessagePattern('commit-transaction')
  commit(params: { userId: number; amount: number }) {
    return this.transactionsService.commit(params.userId, params.amount);
  }
}
