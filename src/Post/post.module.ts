import { Module } from '@nestjs/common';
import { CloudinaryModule } from 'src/shared/infrastructure/cloudinary/cloudinary.module';
import { postController } from './infrastructure/controller/post.controller';
import { postUsesCases } from './application/post.use.cases';
import { postRepositorySequelize } from './infrastructure/repository/post.repository.sequelize';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { badWordsService } from 'src/shared/infrastructure/IAtext/bad.word.service';


@Module({
  controllers: [postController],
  providers:[postUsesCases,postRepositorySequelize,userRepositorySequelize, badWordsService],
  exports:[],
  imports:[CloudinaryModule]
})
export class PostModule {}
