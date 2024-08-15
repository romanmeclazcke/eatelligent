import { Module } from '@nestjs/common';

import { likeController } from './infrastructure/controller/like.controller';
import { likeUseCases } from './application/like.use.cases';
import { likeRepositorySequelize } from './infrastructure/repository/like.repository.sequelize';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { postRepositorySequelize } from 'src/Post/infrastructure/repository/post.repository.sequelize';


@Module({
  controllers: [likeController],
  providers:[likeUseCases,likeRepositorySequelize,userRepositorySequelize, postRepositorySequelize],
  exports:[],
  imports:[]
})
export class LikeModule {}
