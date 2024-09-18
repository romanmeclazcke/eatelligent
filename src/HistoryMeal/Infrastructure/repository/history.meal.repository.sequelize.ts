import { Injectable } from "@nestjs/common";
import { historyMealRepository } from "../../domain/history.meal.repository";
import { historyMealEntity } from "src/HistoryMeal/domain/history.meal.entity";
import HistoryMeal from "../model/history.meal.model";
import Meal from "src/Meal/infrastructure/model/meal.model";

@Injectable()
export class historyMealRepositorySequelize implements historyMealRepository{
    
    async getHistoryMeal(userId: string): Promise<historyMealEntity[]> {
        return await HistoryMeal.findAll({
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
       return await HistoryMeal.create({
        userId:userId,
        mealId:mealId
       })
    }

}