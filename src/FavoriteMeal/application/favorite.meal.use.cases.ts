import { Injectable, Res } from "@nestjs/common";
import { favoriteMealrepositoySequelize } from "../infrastructure/repository/favorite.meal.respository.sequelize";
import { Result } from "src/shared/infrastructure/patternResult/result";
import { mealEntity } from "src/Meal/domain/meal.entity";
import { userRepositorySequelize } from "src/user/infrastructure/repository/user.repository.sequelize";
import { mealRepositorySequelize } from "src/Meal/infrastructure/repository/meal.repository.sequelize";
import { favoriteMealEntity } from "../domain/favorite.meal.entity";

@Injectable()
export class favoriteMealUseCases {
  constructor(
    private favoriteMealRepository: favoriteMealrepositoySequelize,
    private userRepository: userRepositorySequelize,
    private mealRepository: mealRepositorySequelize,
  ) {}

  async getAllFavoriteMeal(
    userId: string,
  ): Promise<Result<favoriteMealEntity[] | null>> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      return Result.failure('User not found', 404);
    }

    const meals = await this.favoriteMealRepository.getFavoriteMeals(userId);

    if (meals) {
      return Result.succes(meals, 200);
    }
    return Result.failure('User havent favorite meals', 404);
  }

  async addFavoriteMeal(
    userId: string,
    mealId: string,
  ): Promise<Result<favoriteMealEntity | null>> {
    
      // Verificar la existencia del usuario
      const user = await this.userRepository.getUserById(userId);
      if (!user) {
        return Result.failure('User not found', 404);
      }
  
      // Verificar la existencia de la comida
      const meal = await this.mealRepository.getMealById(mealId);
      if (!meal) {
        return Result.failure('Meal not found', 404);
      }
  
      // Verificar si la comida ya está en favoritos
      const exist = await this.favoriteMealRepository.getFavoriteMealById(userId, mealId);
      if (exist) {
        return Result.failure('Favorite meal already exists', 409);
      }
  
      // Intentar agregar la comida a favoritos
      const added = await this.favoriteMealRepository.addFavoriteMeal(userId, mealId);
      if (added) {
        return Result.succes(added, 201);
      }
  
      return Result.failure('Internal server error', 500);
  }
  

  async deleteFavoriteMeal(
    userId: string,
    mealId: string,
  ): Promise<Result<String | null>> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      return Result.failure('User not found', 404);
    }

    const meal = await this.mealRepository.getMealById(mealId);

    if (!meal) {
      return Result.failure('meal not found', 404);
    }

    const deleted = await this.favoriteMealRepository.deleteFavoriteMeal(
      userId,
      mealId,
    );

    if (deleted!=0) {
      return Result.succes("Meal removed from favorites", 200);
    }

    return Result.failure('Favorite meal not found', 404);
  }
}