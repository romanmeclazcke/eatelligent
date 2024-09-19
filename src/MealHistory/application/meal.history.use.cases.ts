import { Injectable } from "@nestjs/common";
import { historyMealEntity } from "../domain/meal.history.entity";
import { Result } from "src/Shared/infrastructure/patternResult/result";
import { userRepositorySequelize } from "src/user/infrastructure/repository/user.repository.sequelize";
import { mealRepositorySequelize } from "src/Meal/infrastructure/repository/meal.repository.sequelize";
import { mealHistoryRepositorySequelize } from "../Infrastructure/repository/meal.history.repository.sequelize";

@Injectable()
export class mealHistoryUseCases{
    constructor(private historyMealRepository: mealHistoryRepositorySequelize, private userRepositoy:userRepositorySequelize, private mealRepository:mealRepositorySequelize){}

    async getHistoryMeal(userId:string):Promise<Result<historyMealEntity[]>>{
        const user = await this.userRepositoy.getUserById(userId)

        if(!user) return Result.failure("User not found",404)

        const historyMeals = await this.historyMealRepository.getHistoryMeal(userId);

        return Result.succes(historyMeals,200);
    }

    async addMealToHistory( userId:string,mealId:string):Promise<Result<historyMealEntity>>{
        const user = await this.userRepositoy.getUserById(userId)

        if(!user) return Result.failure("User not found",404)

        const meal = await this.mealRepository.getMealById(mealId)

        if(!meal) return Result.failure("Meal not found",404)

    
    
        const added= await this.historyMealRepository.addHistoryMeal(userId,mealId)

        if(added) return Result.succes(added,201)

        return Result.failure("Internal server error", 500)
    
    }

}