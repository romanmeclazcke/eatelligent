import { Module } from '@nestjs/common';
import {userController } from './infrastructure/controller/user.controller';
import { userUseCases } from './application/user.use.cases';
import { userRepositorySequelize } from './infrastructure/repository/user.repository.sequelize';
import { CloudinaryModule } from 'src/Shared/infrastructure/cloudinary/cloudinary.module';
import { AuthService } from 'src/Shared/infrastructure/auth/auth.service';
import { SightEngineServices } from 'src/Shared/infrastructure/IAimage/sight.engine.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { sendEmailServices } from 'src/Shared/infrastructure/emailServices/send.email.service';


@Module({
  controllers: [userController],
  providers:[userUseCases,userRepositorySequelize,AuthService,SightEngineServices,sendEmailServices],
  exports:[userUseCases],
  imports:[CloudinaryModule,HttpModule]
})
export class UserModule {}
