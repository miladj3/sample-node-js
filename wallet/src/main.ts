import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WalletModule } from './wallet.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WalletModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.WALLET_SERVICE_HOST,
        port: Number(process.env.WALLET_SERVICE_PORT),
        retryDelay: 3_000,
      },
    },
  );

  await app.listen();
}

bootstrap();
