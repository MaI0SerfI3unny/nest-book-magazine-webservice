import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Book magazine engine')
    .setVersion('1.0')
    .addTag('book')
    .addBearerAuth({
      type: 'http',
      scheme:"bearer",
      name: 'Authorization', 
      in: 'header'
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT);
}
bootstrap();
