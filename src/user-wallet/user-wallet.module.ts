import { Module } from '@nestjs/common';
import { BalancesServiceService } from './balances-service/balances-service.service';
import { TransactionsServiceService } from './transactions-service/transactions-service.service';

@Module({
  providers: [BalancesServiceService, TransactionsServiceService],
})
export class UserWalletModule {}
