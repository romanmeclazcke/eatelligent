import { Module } from '@nestjs/common';
import { CloudinaryModule } from 'src/Shared/infrastructure/cloudinary/cloudinary.module';
import { productController } from './infrastructure/controller/product.controller';
import { productUseCases } from './application/product.use.cases';
import { productRepositorySequelize } from './infrastructure/repository/product.repository.sequelize';


@Module({
  controllers: [productController],
  providers:[productUseCases,productRepositorySequelize],
  exports:[],
  imports:[CloudinaryModule]
})
export class ProductModule {}
