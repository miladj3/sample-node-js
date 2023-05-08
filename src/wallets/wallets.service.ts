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

  async addMoney(userId: number, amount: number): Promise<number> {
    const balance = await this.getBalance(userId);
    const isValidTransaction = balance + amount >= 0;
    if (isValidTransaction) return this.repository.addMoney(userId, amount);
    throw new Error('Invalid amount: Not enough money in your wallet.');
  }

  getBalance(userId: number): Promise<number> {
    return this.repository.getBalance(userId);
  }
}
