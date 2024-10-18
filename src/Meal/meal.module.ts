import { Module } from '@nestjs/common';
import { mealController } from './infrastructure/controller/meal.controller';
import { mealUseCases } from './application/meal.use.cases';
import { mealRepositorySequelize } from './infrastructure/repository/meal.repository.sequelize';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { CloudinaryModule } from 'src/Shared/infrastructure/cloudinary/cloudinary.module';

@Module({
  controllers: [mealController],
  providers: [mealUseCases, mealRepositorySequelize, userRepositorySequelize],
  exports: [],
  imports: [CloudinaryModule],
})
export class MealModule {}
