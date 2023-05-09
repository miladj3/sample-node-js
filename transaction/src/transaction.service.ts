import { Inject, Injectable } from '@nestjs/common';
import { ITransactionService } from './interfaces/transaction.service';
import {
  ITransactionRepository,
  TRANSACTION_REPOSITORY_TOKEN,
} from './interfaces/transaction.repository';

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @Inject(TRANSACTION_REPOSITORY_TOKEN)
    private readonly repository: ITransactionRepository,
  ) {}

  commit(userId: number, amount: number): Promise<number> {
    return this.repository.commit(userId, amount);
  }
}
