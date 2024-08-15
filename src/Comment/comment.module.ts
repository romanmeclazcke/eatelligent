import { Module } from '@nestjs/common';
import { commentController } from './infrastructure/controller/comment.controller';
import { commentUseCases } from './application/comment.use.cases';
import { commentRepositorySequelize } from './infrastructure/repository/comment.repository.sequelize';


@Module({
  controllers: [commentController],
  providers:[commentUseCases,commentRepositorySequelize],
  exports:[],
  imports:[]
})
export class PostModule {}
