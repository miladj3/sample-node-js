import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import {
  IWalletService,
  WALLET_SERVICE_TOKEN,
} from './interfaces/wallet.service';
import { firstValueFrom } from 'rxjs';

@Controller()
export class WalletsController {
  constructor(
    @Inject(WALLET_SERVICE_TOKEN)
    private readonly walletService: IWalletService,
    @Inject('TRANSACTION_SERVICE') private readonly client: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'add-money' })
  async addMoney({ userId, amount }: { userId: number; amount: number }) {
    try {
      await this.walletService.addMoney(userId, amount);
      return await firstValueFrom(
        this.client.send<number>('commit-transaction', {
          userId,
          amount,
        }),
      );
    } catch (error) {
      return { error: error.message };
    }
  }

  @MessagePattern({ cmd: 'get-balance' })
  async getBalance({ userId }: { userId: number }) {
    try {
      return await this.walletService.getBalance(userId);
    } catch (error) {
      return { error };
    }
  }
}
