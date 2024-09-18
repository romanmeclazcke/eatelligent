import { Module } from '@nestjs/common';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { historyMealController } from './Infrastructure/controller/history.meal.controller';
import { historyMealUseCases } from './application/history.meal.use.cases';
import { historyMealRepositorySequelize } from './Infrastructure/repository/history.meal.repository.sequelize';
import { mealRepositorySequelize } from 'src/Meal/infrastructure/repository/meal.repository.sequelize';


@Module({
  controllers: [historyMealController],
  providers:[historyMealUseCases,historyMealRepositorySequelize,userRepositorySequelize, mealRepositorySequelize],
  exports:[],
  imports:[]
})
export class HistoryMealModule {}
