import { Module } from '@nestjs/common';
import { commentController } from './infrastructure/controller/comment.controller';
import { commentUseCases } from './application/comment.use.cases';
import { commentRepositorySequelize } from './infrastructure/repository/comment.repository.sequelize';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { postRepositorySequelize } from 'src/Post/infrastructure/repository/post.repository.sequelize';
import { badWordsService } from 'src/Shared/infrastructure/IAtext/bad.word.service';
import { trasnlateService } from 'src/Shared/infrastructure/translate/translate.service';

@Module({
  controllers: [commentController],
  providers:[commentUseCases,commentRepositorySequelize, userRepositorySequelize, postRepositorySequelize, badWordsService, trasnlateService],
  exports:[],
  imports:[]
})
export class CommentModule {}
