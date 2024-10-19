import { Module } from '@nestjs/common';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { postRepositorySequelize } from 'src/Post/infrastructure/repository/post.repository.sequelize';
import { followRepositorySequelize } from 'src/Follow/infrastructure/repository/follow.repository.sequelize';
import { showHomeController } from './infrastructure/controller/show.home.controller';
import { showHomeUseCases } from './application/show.home.use.cases';


@Module({
  controllers: [showHomeController],
  providers:[showHomeUseCases,userRepositorySequelize,postRepositorySequelize, followRepositorySequelize],
  exports:[],
  imports:[]
})
export class ShowHomeModule {}
