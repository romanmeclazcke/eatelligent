import { Injectable } from "@nestjs/common";
import { favoriteMealEntity } from "src/FavoriteMeal/domain/favorite.meal.entity";
import { favoriteMealRepository } from "src/FavoriteMeal/domain/favorite.meal.repository";
import FavoriteMeal from "../model/favorite.meal.model";
import Meal from "src/Meal/infrastructure/model/meal.model";

@Injectable()
export class favoriteMealrepositoySequelize implements favoriteMealRepository{
   
    async getFavoriteMeals(userId: string): Promise<favoriteMealEntity[] | null> {
       return  await FavoriteMeal.findAll({
        where:{
            userId:userId
        },
        include:{
            model:Meal,
            as:'favoriteMeal',
            attributes:['name','mealPicture','glutenFree']

        }
       })
    }
    async addFavoriteMeal(userId: string, mealId: string): Promise<favoriteMealEntity | null> {
        return await FavoriteMeal.create({
            userId:userId,
            mealId:mealId
        })
    }
    async deleteFavoriteMeal(userId: string, mealId: string): Promise<number | null> {
        return await FavoriteMeal.destroy({
            where:{
                userId:userId,
                mealId:mealId
            }
        })
    }

    async getFavoriteMealById(userId: string, mealId: string): Promise<favoriteMealEntity | null> {
        return await FavoriteMeal.findOne({
            where:{
                userId:userId,
                mealId:mealId
            }
        })
    }

}