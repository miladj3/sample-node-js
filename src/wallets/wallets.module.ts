import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WALLETS_SERVICE_TOKEN } from './interfaces/wallets.service';
import { WALLETS_REPOSITORY_TOKEN } from './interfaces/wallets.repository';
import { WalletRepository } from './wallet.repository';
import { WalletsController } from './wallets.controller';

@Module({
  providers: [
    {
      provide: WALLETS_SERVICE_TOKEN,
      useClass: WalletsService,
    },
    {
      provide: WALLETS_REPOSITORY_TOKEN,
      useClass: WalletRepository,
    },
  ],
  controllers: [WalletsController],
})
export class WalletsModule {}
