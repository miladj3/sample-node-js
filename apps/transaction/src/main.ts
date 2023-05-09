import { NestFactory } from '@nestjs/core';
import { TransactionModule } from './transaction.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TransactionModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.TRANSACTION_SERVICE_HOST,
        port: Number(process.env.TRANSACTION_SERVICE_PORT),
        retryDelay: 3_000,
      },
    },
  );
  await app.listen();
}

bootstrap();
