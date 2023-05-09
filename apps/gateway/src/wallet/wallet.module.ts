import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { WalletService } from './wallet.service';

@Module({
  providers: [
    {
      provide: 'WALLET_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('WALLET_SERVICE_HOST'),
            port: configService.get<number>('WALLET_SERVICE_PORT'),
          },
        });
      },
      inject: [ConfigService],
    },
    WalletService,
  ],
  controllers: [WalletsController],
  imports: [ConfigModule.forRoot({ isGlobal: true })],
})
export class WalletModule {}
