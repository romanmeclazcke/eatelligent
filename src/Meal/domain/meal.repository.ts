import Meal from "../infrastructure/model/meal.model";
import { mealCreateDto } from "./dto/meal.create.dto";
import { mealOrderParams } from "./dto/meal.order.params.dto";
import { mealUpdateDto } from "./dto/meal.update.dto";
import { mealEntity } from "./meal.entity";

export interface mealRepository{

    getMeals(mealOrderParams:mealOrderParams):Promise<mealEntity[]|null>
    getMealsByTastes(userId:string):Promise<mealEntity[]|null>
    getMealById(mealId:string):Promise<mealEntity|null>
    createMeal(mealCreateDto:mealCreateDto):Promise<Meal|null>//SOLO USUARIOS AMDIN
    updateMeals(mealId:string,mealUpdateDto:mealUpdateDto):Promise<mealEntity|null>//SOLO USUARIOS AMDIN
    deleteMeal(mealId:string):Promise<number|null>//SOLO USUARIOS AMDIN
}