import { Injectable } from "@nestjs/common";
import { mealRepository } from "src/Meal/domain/meal.repository";

@Injectable()
export class mealRepositorySequelize implements mealRepository{

}