import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from '../transaction.service';
import {
  ITransactionRepository,
  TRANSACTION_REPOSITORY_TOKEN,
} from '../interfaces/transaction.repository';
import { TRANSACTION_SERVICE_TOKEN } from '../interfaces/transaction.service';

class MockedRepository implements ITransactionRepository {
  private transactions = new Map();

  async commit(userId: number, amount: number): Promise<number> {
    const referenceNumber = `${userId}${amount}00`;
    this.transactions.set(referenceNumber, { userId, amount });
    return Number(referenceNumber);
  }

  calculateTotal(): Promise<number> {
    return Promise.resolve(0);
  }

  calculateTransactionsByUser(userId: number): Promise<number> {
    return Promise.resolve(1000);
  }

  getTransactionDetails(
    referenceId: number,
  ): Promise<{ userId: number; amount: number }> {
    return Promise.resolve({ amount: 0, userId: 0 });
  }
}

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TRANSACTION_REPOSITORY_TOKEN,
          useClass: MockedRepository,
        },
        {
          provide: TRANSACTION_SERVICE_TOKEN,
          useClass: TransactionService,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TRANSACTION_SERVICE_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
