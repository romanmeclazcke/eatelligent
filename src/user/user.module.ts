import { Module } from '@nestjs/common';
import {userController } from './infrastructure/controller/user.controller';
import { userUseCases } from './application/user.use.cases';
import { userRepositoryPrisma } from './infrastructure/repository/user.repository.prisma';


@Module({
  controllers: [userController],
  providers:[userUseCases,userRepositoryPrisma],
  exports:[userUseCases]
})
export class UserModule {}
