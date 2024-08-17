import { Module } from '@nestjs/common';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { favoritePostController } from './infrastructure/controller/favorite.post.controller';
import { favoritePostUseCases } from './application/favorite.post.use.cases';
import { favoritePostRepositorySequelize } from './infrastructure/repository/favorite.post.repository.prisma';
import { postRepositorySequelize } from 'src/Post/infrastructure/repository/post.repository.sequelize';


@Module({
  controllers: [favoritePostController],
  providers:[favoritePostUseCases,favoritePostRepositorySequelize,userRepositorySequelize, postRepositorySequelize],
  exports:[],
  imports:[]
})
export class FavoritePostModule {}
