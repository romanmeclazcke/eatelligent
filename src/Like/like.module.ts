import { Module } from '@nestjs/common';

import { likeController } from './infrastructure/controller/like.controller';
import { likeUseCases } from './application/like.use.cases';
import { likeRepositorySequelize } from './infrastructure/repository/like.repository.sequelize';


@Module({
  controllers: [likeController],
  providers:[likeUseCases,likeRepositorySequelize],
  exports:[],
  imports:[]
})
export class LikeModule {}
