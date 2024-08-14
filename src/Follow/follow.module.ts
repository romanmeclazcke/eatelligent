import { Module } from '@nestjs/common';

import { followController } from './infrastructure/controller/follow.controller';
import { followUseCases } from './application/follow.use.cases';
import { followRepositorySequelize } from './infrastructure/repository/follow.repository.sequelize';


@Module({
  controllers: [followController],
  providers:[followUseCases,followRepositorySequelize],
  exports:[],
  imports:[]
})
export class FollowModule {}
