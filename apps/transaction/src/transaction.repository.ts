import { ITransactionRepository } from './interfaces/transaction.repository';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/database/database.service';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(private readonly db: DatabaseService) {}

  async commit(userId: number, amount: number): Promise<number> {
    const transaction = await this.db.transaction.create({
      data: {
        amount,
        userId,
      },
    });
    return transaction.id;
  }

  async calculateTotal(): Promise<number> {
    const result = await this.db.transaction.aggregate({
      _sum: {
        amount: true,
      },
    });
    return result._sum.amount;
  }

  async calculateTransactionsByUser(userId: number): Promise<number> {
    const result = await this.db.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId,
      },
    });
    return result._sum.amount;
  }

  async getTransactionDetails(
    referenceId: number,
  ): Promise<{ userId: number; amount: number }> {
    const transaction = await this.db.transaction.findFirst({
      where: {
        id: referenceId,
      },
    });
    return {
      userId: transaction.userId,
      amount: transaction.amount,
    };
  }
}
