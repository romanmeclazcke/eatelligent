import { Module } from '@nestjs/common';
import {userController } from './infrastructure/controller/user.controller';
import { userUseCases } from './application/user.use.cases';
import { userRepositorySequelize } from './infrastructure/repository/user.repository.sequelize';


@Module({
  controllers: [userController],
  providers:[userUseCases,userRepositorySequelize],
  exports:[userUseCases]
})
export class UserModule {}
