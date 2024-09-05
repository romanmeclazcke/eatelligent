import { favoriteMealEntity } from "./favorite.meal.entity";

export interface favoriteMealRepository{
    getFavoriteMeals(userId:string):Promise<favoriteMealEntity[]|null>;
    addFavoriteMeal(userId:string,mealId:string):Promise<favoriteMealEntity|null>;
    deleteFavoriteMeal(userId:string,mealId:string):Promise<number|null>;
    getFavoriteMealById(userId:string,mealId:string):Promise<favoriteMealEntity|null>;

}