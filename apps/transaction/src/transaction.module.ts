import { Module } from '@nestjs/common';
import { TRANSACTION_REPOSITORY_TOKEN } from './interfaces/transaction.repository';
import { TransactionRepository } from './transaction.repository';
import { TRANSACTION_SERVICE_TOKEN } from './interfaces/transaction.service';
import { TransactionService } from './transaction.service';
import { TransactionTasksService } from './transaction-tasks.service';
import { TransactionsController } from './transactions.controller';
import { DatabaseService } from '@app/database/database.service';
import { DatabaseModule } from '@app/database';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [DatabaseModule, ScheduleModule.forRoot()],
  providers: [
    {
      provide: TRANSACTION_REPOSITORY_TOKEN,
      useClass: TransactionRepository,
    },
    {
      provide: TRANSACTION_SERVICE_TOKEN,
      useClass: TransactionService,
    },
    TransactionTasksService,
    DatabaseService,
  ],
  controllers: [TransactionsController],
})
export class TransactionModule {}
