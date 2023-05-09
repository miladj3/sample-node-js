import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class WalletService {
  constructor(@Inject('WALLET_SERVICE') private readonly client: ClientProxy) {}

  async getBalance(userId: number) {
    const { error, ...data } = await this.client
      .send({ cmd: 'get-balance' }, { userId })
      .toPromise();
    if (error) return { error };
    return {
      balance: data,
    };
  }

  async addMoney(userId: number, amount: number) {
    const { error, ...data } = await this.client
      .send({ cmd: 'add-money' }, { userId, amount })
      .toPromise();
    if (error) return { error };
    return {
      reference_id: data,
    };
  }
}
