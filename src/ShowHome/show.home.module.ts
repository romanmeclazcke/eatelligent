import { Module } from '@nestjs/common';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { postRepositorySequelize } from 'src/Post/infrastructure/repository/post.repository.sequelize';
import { followRepositorySequelize } from 'src/Follow/infrastructure/repository/follow.repository.sequelize';


@Module({
  controllers: [],
  providers:[userRepositorySequelize,postRepositorySequelize, followRepositorySequelize],
  exports:[],
  imports:[]
})
export class ShowHomeModule {}
