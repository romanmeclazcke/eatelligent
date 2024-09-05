import { Module } from '@nestjs/common';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { dislikeProductController } from './infrastructure/controller/dislike.product.controller';
import { dislikeProductUseCases } from './application/dislike.product.use.cases';
import { dislikeProductRepositorySequelize } from './infrastructure/repository/dislike.product.repository.sequelize';
import { productRepositorySequelize } from 'src/Product/infrastructure/repository/product.repository.sequelize';


@Module({
  controllers: [dislikeProductController],
  providers:[dislikeProductUseCases,dislikeProductRepositorySequelize,userRepositorySequelize, productRepositorySequelize],
  exports:[],
  imports:[]
})
export class DislikeProductModule {}
