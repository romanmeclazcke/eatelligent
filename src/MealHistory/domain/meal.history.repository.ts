import { historyMealEntity } from "./meal.history.entity";

export interface mealHistoryRepository{

    getHistoryMeal(userId:string):Promise<historyMealEntity[]>
    addHistoryMeal(userId:string, mealId:string):Promise<historyMealEntity>
    
}