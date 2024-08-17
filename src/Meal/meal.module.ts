import { Module } from '@nestjs/common';
import { mealController } from './infrastructure/controller/meal.controller';
import { mealUseCases } from './application/meal.use.cases';
import { mealRepositorySequelize } from './infrastructure/repository/meal.repository.sequelize';


@Module({
  controllers: [mealController],
  providers:[mealUseCases,mealRepositorySequelize],
  exports:[],
  imports:[]
})
export class MealModule {}
