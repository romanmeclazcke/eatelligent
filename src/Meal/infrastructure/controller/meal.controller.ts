import { Controller } from "@nestjs/common";
import { mealUseCases } from "src/Meal/application/meal.use.cases";


@Controller('meal')
export class mealController{

    constructor(private mealUseCases:mealUseCases){}
}