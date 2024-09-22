import { Module } from '@nestjs/common';
import { showProfileController } from './infrastructure/controller/show.profile.controller';
import { showProfileUseCases } from './application/show.profile.use.cases';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { postRepositorySequelize } from 'src/Post/infrastructure/repository/post.repository.sequelize';
import { followRepositorySequelize } from 'src/Follow/infrastructure/repository/follow.repository.sequelize';


@Module({
  controllers: [showProfileController],
  providers:[showProfileUseCases,userRepositorySequelize,postRepositorySequelize, followRepositorySequelize],
  exports:[],
  imports:[]
})
export class ShowProfileModule {}
