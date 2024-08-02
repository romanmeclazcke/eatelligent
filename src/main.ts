import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'; 
import { syncDatabase } from './shared/infrastructure/db/db.sequelize.config';

async function bootstrap() {
  dotenv.config();
  console.log(process.env.DATABASE)
  console.log(process.env.PORT)
  const app = await NestFactory.create(AppModule);
  syncDatabase();
  await app.listen(3000);
}
bootstrap();
