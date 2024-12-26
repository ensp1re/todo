import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import * as compression from 'compression';
import * as hpp from 'hpp';
import helmet from 'helmet';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.use(json({ limit: '50mb' }));
  app.use(compression());
  app.use(helmet());
  app.use(hpp());



  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('The Todo API description')
    .setVersion('1.0')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
