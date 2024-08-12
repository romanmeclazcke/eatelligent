import { Module } from '@nestjs/common';
import {userController } from './infrastructure/controller/user.controller';
import { userUseCases } from './application/user.use.cases';
import { userRepositorySequelize } from './infrastructure/repository/user.repository.sequelize';
import { CloudinaryModule } from 'src/shared/infrastructure/cloudinary/cloudinary.module';
import { AuthService } from 'src/shared/infrastructure/auth/auth.service';


@Module({
  controllers: [userController],
  providers:[userUseCases,userRepositorySequelize,AuthService],
  exports:[userUseCases],
  imports:[CloudinaryModule]
})
export class UserModule {}
