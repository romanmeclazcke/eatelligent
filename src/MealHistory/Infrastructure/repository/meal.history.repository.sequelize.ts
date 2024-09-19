import { Injectable } from "@nestjs/common";
import { historyMealEntity } from "src/MealHistory/domain/meal.history.entity";
import Meal from "src/Meal/infrastructure/model/meal.model";
import MealHistory from "../model/meal.history.model";
import { mealHistoryRepository } from "src/MealHistory/domain/meal.history.repository";


@Injectable()
export class mealHistoryRepositorySequelize implements mealHistoryRepository{
    
    async getHistoryMeal(userId: string): Promise<historyMealEntity[]> {
        return await MealHistory.findAll({
            attributes:['id','createdAt'],
            where :{
                userId:userId
            },
            include:{
                model: Meal,
                as: 'meal',
                attributes: ['id', 'name','mealPicture','calories','carbohydrates','glutenFree']
            },
            order:[['createdAt','DESC']]
        })
    }
    async addHistoryMeal(userId: string, mealId: string): Promise<historyMealEntity> {
       return await MealHistory.create({
        userId:userId,
        mealId:mealId
       })
    }

}