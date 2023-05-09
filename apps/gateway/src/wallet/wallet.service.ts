import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class WalletService {
  constructor(@Inject('WALLET_SERVICE') private readonly client: ClientProxy) {}

  async getBalance(userId: number) {
    const result = await this.client
      .send({ cmd: 'get-balance' }, { userId })
      .toPromise();
    if (result.error) return { error: result.error };
    return {
      balance: result,
    };
  }

  async addMoney(userId: number, amount: number) {
    const result = await this.client
      .send({ cmd:"add-money"' }, { userId, amount })
      .toPromise();
    if (result.error) return { error: result.error };
    return {
      reference_id: result
    };
  }
}
