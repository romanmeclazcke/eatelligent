import { historyMealEntity } from "./history.meal.entity";

export interface historyMealRepository{

    getHistoryMeal(userId:string):Promise<historyMealEntity[]>
    addHistoryMeal(userId:string, mealId:string):Promise<historyMealEntity>
    
}