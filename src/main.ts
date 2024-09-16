import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'; 
import { syncDatabase } from './Shared/infrastructure/db/db.sequelize.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  syncDatabase();
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true //no acepta peticiones con propiedaes que no necesita
    })
  )

  app.setGlobalPrefix('api')

  await app.listen(3000);
}
bootstrap();
