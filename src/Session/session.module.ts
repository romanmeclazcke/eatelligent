import { Module } from '@nestjs/common';
import { AuthService } from 'src/shared/infrastructure/auth/auth.service';
import { sessionController } from './infrastructure/controller/session.controller';
import { sessionUseCases } from './application/session.use.cases';
import { sessionRepositorySequelize } from './infrastructure/repository/session.repository.sequelize';


@Module({
  controllers: [sessionController],
  providers:[sessionUseCases,sessionRepositorySequelize,AuthService],
  exports:[],
  imports:[]
})
export class SessionModule {}
