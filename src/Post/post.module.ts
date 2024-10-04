import { Module } from '@nestjs/common';
import { CloudinaryModule } from 'src/Shared/infrastructure/cloudinary/cloudinary.module';
import { postController } from './infrastructure/controller/post.controller';
import { postUsesCases } from './application/post.use.cases';
import { postRepositorySequelize } from './infrastructure/repository/post.repository.sequelize';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { badWordsService } from 'src/Shared/infrastructure/IAtext/bad.word.service';
import { trasnlateService } from 'src/Shared/infrastructure/translate/translate.service';


@Module({
  controllers: [postController],
  providers:[postUsesCases,postRepositorySequelize,userRepositorySequelize, badWordsService,trasnlateService ],
  exports:[postRepositorySequelize],
  imports:[CloudinaryModule]
})
export class PostModule {}
