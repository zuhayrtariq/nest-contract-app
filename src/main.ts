import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['encryptionKey']
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist : true,
      transform: true,
      transformOptions: {enableImplicitConversion: true},
    })
  ) 
  app.enableCors(
    {
      origin : ['http://localhost:5173'],
     
      credentials: true
    }
  );
  await app.listen(3000);
}
bootstrap();
