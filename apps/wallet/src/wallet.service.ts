import { Inject, Injectable } from '@nestjs/common';
import { IWalletService } from './interfaces/wallet.service';
import {
  IWalletRepository,
  WALLET_REPOSITORY_TOKEN,
} from './interfaces/wallet.repository';

@Injectable()
export class WalletService implements IWalletService {
  constructor(
    @Inject(WALLET_REPOSITORY_TOKEN)
    private readonly repository: IWalletRepository,
  ) {}

  addMoney(userId: number, amount: number): Promise<number> {
    return new Promise((resolve, reject) => {
      // handling wallet lock
      setTimeout(async () => {
        const balance = await this.getBalance(userId);
        const isValidTransaction = balance + amount >= 0;
        if (isValidTransaction) {
          resolve(await this.repository.addMoney(userId, amount));
        } else {
          reject(new Error('Invalid amount: Not enough money in your wallet.'));
        }
      }, Math.round(Math.random() * 200));
    });
  }

  getBalance(userId: number): Promise<number> {
    return this.repository.getBalance(userId);
  }
}
