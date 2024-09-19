import { Module } from '@nestjs/common';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { mealHistoryController } from './Infrastructure/controller/meal.history.controller';
import { mealHistoryUseCases } from './application/meal.history.use.cases';
import { mealRepositorySequelize } from 'src/Meal/infrastructure/repository/meal.repository.sequelize';
import { mealHistoryRepositorySequelize } from './Infrastructure/repository/meal.history.repository.sequelize';


@Module({
  controllers: [mealHistoryController],
  providers:[mealHistoryUseCases,mealHistoryRepositorySequelize,userRepositorySequelize, mealRepositorySequelize],
  exports:[],
  imports:[]
})
export class MealHistoryModule {}
