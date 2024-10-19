import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'; 
import { syncDatabase } from './Shared/infrastructure/db/db.sequelize.config';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuardJwt } from './Shared/infrastructure/guards/auth.guard.jwt';
import { JwtService } from '@nestjs/jwt';
import { userRepositorySequelize } from './user/infrastructure/repository/user.repository.sequelize';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  syncDatabase();
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new AuthGuardJwt( new JwtService(), new userRepositorySequelize(), new Reflector()));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true //no acepta peticiones con propiedaes que no necesita
    })
  )

  const config = new DocumentBuilder()
    .setTitle('EatElligent')
    .setDescription('Documentation about eatelligent')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.setGlobalPrefix('api')

  await app.listen(3000);
}
bootstrap();
