import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('DaalCo Assessment Test')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = configService.get<number>('GATEWAY_PORT');
  await app.listen(port, () => {
    console.log(
      `API gateway started on port [${port}], OpenAPI has started on http://localhost:${port}/api`,
    );
  });
}

bootstrap();
