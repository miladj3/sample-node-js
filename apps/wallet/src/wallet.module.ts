import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WALLET_SERVICE_TOKEN } from './interfaces/wallet.service';
import { WALLET_REPOSITORY_TOKEN } from './interfaces/wallet.repository';
import { WalletRepository } from './wallet.repository';
import { WalletsController } from './wallets.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { DatabaseModule, DatabaseService } from '@app/database';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule],
  providers: [
    DatabaseService,
    {
      provide: WALLET_SERVICE_TOKEN,
      useClass: WalletService,
    },
    {
      provide: WALLET_REPOSITORY_TOKEN,
      useClass: WalletRepository,
    },
    {
      provide: 'TRANSACTION_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('TRANSACTION_SERVICE_HOST'),
            port: configService.get<number>('TRANSACTION_SERVICE_PORT'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  controllers: [WalletsController],
})
export class WalletModule {}
