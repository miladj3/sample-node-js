import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const configService = app.get(ConfigService);
  // await app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     host: configService.get<string>('TRANSACTION_SERVICE_HOST'),
  //     port: configService.get<string>('TRANSACTION_SERVICE_PORT'),
  //   },
  // });
  // await app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     host: configService.get<string>('WALLET_SERVICE_HOST'),
  //     port: configService.get<string>('WALLET_SERVICE_PORT'),
  //   },
  // });
  // await app.startAllMicroservices();
  await app.listen(configService.get<number>('GATEWAY_PORT'));
}

bootstrap();
