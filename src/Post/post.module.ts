import { Module } from '@nestjs/common';
import { CloudinaryModule } from 'src/shared/infrastructure/cloudinary/cloudinary.module';
import { AuthService } from 'src/shared/infrastructure/auth/auth.service';
import { postController } from './infrastructure/controller/post.controller';
import { postUsesCases } from './application/post.use.cases';
import { postRepositorySequelize } from './infrastructure/repository/post.repository.sequelize';


@Module({
  controllers: [postController],
  providers:[postUsesCases,postRepositorySequelize],
  exports:[],
  imports:[CloudinaryModule]
})
export class PostModule {}
