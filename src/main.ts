import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.APP_TRANSPORTER_HOST,
        port: Number(process.env.APP_TRANSPORTER_PORT),
        retryDelay: 3_000,
      },
    },
  );
  await app.listen();
}

bootstrap();
