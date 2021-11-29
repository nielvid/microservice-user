import { NestFactory } from '@nestjs/core';
//import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.TCP,
  //   options: {
  //     host: process.env.TCP_HOST,
  //     port: process.env.TCP_PORT,
  //   },
  // });
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .setTitle("Godson's Blog API Gateway")
    .setDescription('Brief guide on how to use our api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
  const port = process.env.PORT || 4000;
  await app.listen(port);
  Logger.log('info', `Server running on Port ${port}`);
}
bootstrap();
