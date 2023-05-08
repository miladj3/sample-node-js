import { IWalletsRepository } from './interfaces/wallets.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletRepository implements IWalletsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async addMoney(userId: number, amount: number): Promise<number> {
    const currentBalance = await this.getBalance(userId);
    const updatedWallet = await this.prisma.wallet.update({
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
    const userWallet = await this.prisma.wallet.findFirst({
      where: {
        userId,
      },
    });
    if (userWallet) return userWallet.balance;
    //   we have to initialize it
    const createdWallet = await this.prisma.wallet.create({
      data: {
        userId,
        balance: 0,
      },
    });
    return createdWallet.balance;
  }
}
