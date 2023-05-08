import { Inject, Injectable } from '@nestjs/common';
import { IWalletsService } from './interfaces/wallets.service';
import {
  IWalletsRepository,
  WALLETS_REPOSITORY_TOKEN,
} from './interfaces/wallets.repository';

@Injectable()
export class WalletsService implements IWalletsService {
  constructor(
    @Inject(WALLETS_REPOSITORY_TOKEN)
    private readonly repository: IWalletsRepository,
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
