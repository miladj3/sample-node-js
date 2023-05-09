import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletService: WalletService) {}

  @Get('balance')
  async getBalance(@Param('user_id') userId: number) {
    return this.walletService.getBalance(userId);
  }

  @Post('addMoney')
  async addMoney(
    @Body() { user_id: userId, amount }: { user_id: number; amount: number },
  ) {
    return this.walletService.addMoney(userId, amount);
  }
}
