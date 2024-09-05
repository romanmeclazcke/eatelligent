import { Module } from '@nestjs/common';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { favoriteMealsController } from './infrastructure/controller/favorite.meal.controller';
import { favoriteMealUseCases } from './application/favorite.meal.use.cases';
import { favoriteMealrepositoySequelize } from './infrastructure/repository/favorite.meal.respository.sequelize';
import { mealRepositorySequelize } from 'src/Meal/infrastructure/repository/meal.repository.sequelize';


@Module({
  controllers: [favoriteMealsController],
  providers:[favoriteMealUseCases,favoriteMealrepositoySequelize,userRepositorySequelize, mealRepositorySequelize],
  exports:[],
  imports:[]
})
export class FavoriteMealModule {}
