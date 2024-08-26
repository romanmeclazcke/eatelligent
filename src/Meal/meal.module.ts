import { Module } from '@nestjs/common';
import { mealController } from './infrastructure/controller/meal.controller';
import { mealUseCases } from './application/meal.use.cases';
import { mealRepositorySequelize } from './infrastructure/repository/meal.repository.sequelize';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { CloudinaryService } from 'src/shared/infrastructure/cloudinary/cloudinary.service';


@Module({
  controllers: [mealController],
  providers:[mealUseCases,mealRepositorySequelize,userRepositorySequelize,CloudinaryService],
  exports:[],
  imports:[]
})
export class MealModule {}
