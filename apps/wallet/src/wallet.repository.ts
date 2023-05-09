import { IWalletRepository } from './interfaces/wallet.repository';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/database/database.service';

@Injectable()
export class WalletRepository implements IWalletRepository {
  constructor(private readonly db: DatabaseService) {}

  async addMoney(userId: number, amount: number): Promise<number> {
    const currentBalance = await this.getBalance(userId);
    const updatedWallet = await this.db.wallet.update({
      where: {
        userId,
      },
      data: {
        balance: currentBalance + amount,
      },
    });
    return updatedWallet.balance;
  }

  async getBalance(userId: number): Promise<number> {
    const userWallet = await this.db.wallet.findFirst({
      where: {
        userId,
      },
    });
    if (userWallet) return userWallet.balance;
    //   we have to initialize it
    const createdWallet = await this.db.wallet.create({
      data: {
        userId,
        balance: 0,
      },
    });
    return createdWallet.balance;
  }
}
