import { Injectable } from "@nestjs/common";
import { mealCreateDto } from "src/Meal/domain/dto/meal.create.dto";
import { mealUpdateDto } from "src/Meal/domain/dto/meal.update.dto";
import { mealEntity } from "src/Meal/domain/meal.entity";
import { mealRepository } from "src/Meal/domain/meal.repository";
import Meal from "../model/meal.model";

@Injectable()
export class mealRepositorySequelize implements mealRepository{

    async getMealsByTastes(userId: string): Promise<mealEntity | null> {
        throw new Error("Method not implemented.");
    }
    async getMealsById(mealId: string): Promise<mealEntity | null> {
        return await Meal.findOne({
            where:{
                id:mealId
            }
        })
    }
    async createMeals(mealCreateDto: mealCreateDto): Promise<mealEntity | null> {
        return await Meal.create({
            ...mealCreateDto
        })
    }
    async updateMeals(mealId: string, mealUpdateDto: mealUpdateDto): Promise<mealEntity | null> {
        const [affectedRows] = await Meal.update(mealUpdateDto, {
            where: {
              id: mealId,
            },
        });

        if(affectedRows==0){
            return null
        }

        return this.getMealsById(mealId)
    }
    async deleteMeal(mealId: string): Promise<number | null> {
        return await Meal.destroy({
            where:{
                id: mealId
            }
        })
    }

}