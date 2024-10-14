import { IsIn, IsOptional, IsString, Validate, validate } from "class-validator";
import { IsValidFieldMeals } from "./meal.is.valid.field";
import { mealEntity } from "../meal.entity";

export class mealOrderParams {
    @IsOptional()
    @IsString()
    @Validate(IsValidFieldMeals)
    sort?: keyof mealEntity; // Asegúrate de que esto esté correcto


    @IsOptional()
    @IsString()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc';
}