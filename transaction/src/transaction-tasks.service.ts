import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  ITransactionRepository,
  TRANSACTION_REPOSITORY_TOKEN,
} from './interfaces/transaction.repository';

@Injectable()
export class TransactionTasksService {
  private logger = new Logger();

  constructor(
    @Inject(TRANSACTION_REPOSITORY_TOKEN)
    private readonly repository: ITransactionRepository, // private readonly schedulerRegistry: SchedulerRegistry,
  ) {
    // const task = this.schedulerRegistry.getCronJob('daily-report');
    // task.start();
  }

  // @Cron(CronExpression.EVERY_DAY_AT_1AM)
  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleDailyTransactionSummary() {
    const totalTransactions = await this.repository.calculateTotal();
    this.logger.log(
      `Total Transactions: ${totalTransactions.toLocaleString('en-us')}`,
    );
  }
}
