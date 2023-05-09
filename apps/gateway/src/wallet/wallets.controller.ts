import { Controller, Get, Param, Post } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { GetBalanceDto } from "./dtos/get-balance.dto";

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletService: WalletService) {}

  @Get('balance')
  async getBalance(@Param() body: GetBalanceDto) {
    return this.walletService.getBalance(body.userId);
  }

  @Post('ad"addMoney" async addMoney(@Body() body: AddMoneyDto) {
    return this.walletService.addMoney(body.userId, body.amount);
  }
}
