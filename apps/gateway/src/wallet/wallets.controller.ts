import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { GetBalanceDto } from './dtos/get-balance.dto';
import { AddMoneyDto } from './dtos/add-money.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletService: WalletService) {}

  @Get('balance')
  async getBalance(@Param() body: GetBalanceDto) {
    return this.walletService.getBalance(body.userId);
  }

  @Post('addMoney')
  async addMoney(@Body() body: AddMoneyDto) {
    return this.walletService.addMoney(body.userId, body.amount);
  }
}
