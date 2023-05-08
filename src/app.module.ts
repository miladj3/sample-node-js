import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserWalletModule } from './user-wallet/user-wallet.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserWalletModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
